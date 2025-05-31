import { createHash } from "crypto";
import { lowerBoundSearch } from "../../algorithms/array/boundedSearch";

interface ContinuumEntry {
  hash: number;
  serverIdx: number;
}

export class HashRing {
  private continuum: ContinuumEntry[] = [];
  private servers: string[] = [];
  private replicas: number;
  private indexMap: Record<string, number> = {};

  constructor(serverList: string[], replicas: number = 100) {
    this.replicas = replicas;
    for (let i = 0; i < serverList.length; i++) {
      const srv = serverList[i];
      this.servers.push(srv);
      this.indexMap[srv] = i;
    }
    this.buildContinuum();
  }

  private buildContinuum(): void {
    const entries: ContinuumEntry[] = [];
    for (let i = 0; i < this.servers.length; i++) {
      const serverAddr = this.servers[i];
      for (let r = 0; r < this.replicas; r++) {
        const vnodeKey = `${serverAddr}#${r}`;
        const h = this.hash32(vnodeKey);
        entries.push({ hash: h, serverIdx: i });
      }
    }

    entries.sort((a, b) => a.hash - b.hash);
    this.continuum = entries;
  }

  get(key: string): string | null {
    if (this.continuum.length === 0) return null;

    const keyHash = this.hash32(key);
    const hashes = this.continuum.map(entry => entry.hash);
    let pos = lowerBoundSearch(hashes, keyHash);

    // if keyHash is bigger than any entry, wrap around
    if (pos === hashes.length) {
      pos = 0;
    }
    return this.servers[this.continuum[pos].serverIdx];
  }

  add(server: string): void {
    if (server in this.indexMap) return;
    const newIdx = this.servers.length;
    this.servers.push(server);
    this.indexMap[server] = newIdx;
    this.buildContinuum();
  }

  remove(server: string): void {
    const idx = this.indexMap[server];
    if (idx === undefined) return;
    this.servers.splice(idx, 1);
    delete this.indexMap[server];
    this.indexMap = {};
    for (let i = 0; i < this.servers.length; i++) {
      this.indexMap[this.servers[i]] = i;
    }
    this.buildContinuum();
  }

  getContinuum(): ContinuumEntry[] {
    return this.continuum.slice();
  }

  private hash32(data: string): number {
    /*
    we only need the first 32 bits (4 bytes) of the md5 hash
    (0xAB << 24) = 0xAB000000
    (0xCD << 16) = 0x00CD0000
    (0xEF <<  8) = 0x0000EF00
    (0x12      ) = 0x00000012
    -----------------------------------
    OR all together → 0xABCDEF12

    finally, we need to >>> 0 to ensure the result is a positive integer
    */
    const md5buf = createHash("md5").update(data).digest();
    return (
      ((md5buf[0] & 0xff) << 24) |
      ((md5buf[1] & 0xff) << 16) |
      ((md5buf[2] & 0xff) << 8) |
      (md5buf[3] & 0xff)
    ) >>> 0;
  }
}
