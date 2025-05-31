import { expect } from 'chai';
import { HashRing } from './HashRing';

describe('HashRing', () => {
  describe('constructor', () => {
    it('should create a hash ring with provided servers', () => {
      const servers = ['server1', 'server2', 'server3'];
      const ring = new HashRing(servers);
      
      // Should be able to get servers for keys
      const server = ring.get('test-key');
      expect(server).to.be.oneOf(servers);
    });

    it('should create a hash ring with custom replica count', () => {
      const servers = ['server1', 'server2'];
      const ring = new HashRing(servers, 50);
      
      const continuum = ring.getContinuum();
      // Should have 2 servers * 50 replicas = 100 entries
      expect(continuum).to.have.length(100);
    });

    it('should handle empty server list', () => {
      const ring = new HashRing([]);
      expect(ring.get('test-key')).to.be.null;
    });
  });

  describe('get', () => {
    it('should return consistent results for the same key', () => {
      const servers = ['server1', 'server2', 'server3'];
      const ring = new HashRing(servers);
      
      const key = 'consistent-key';
      const server1 = ring.get(key);
      const server2 = ring.get(key);
      const server3 = ring.get(key);
      
      expect(server1).to.equal(server2);
      expect(server2).to.equal(server3);
    });

    it('should distribute keys across all servers', () => {
      const servers = ['server1', 'server2', 'server3'];
      const ring = new HashRing(servers);
      
      const serverCounts = new Map<string, number>();
      servers.forEach(server => serverCounts.set(server, 0));
      
      // Test with many keys to see distribution
      for (let i = 0; i < 1000; i++) {
        const server = ring.get(`key-${i}`);
        if (server) {
          serverCounts.set(server, (serverCounts.get(server) || 0) + 1);
        }
      }
      
      // All servers should have received some keys
      servers.forEach(server => {
        expect(serverCounts.get(server)).to.be.greaterThan(0);
      });
    });

    it('should return null for empty ring', () => {
      const ring = new HashRing([]);
      expect(ring.get('any-key')).to.be.null;
    });

    it('should handle single server', () => {
      const ring = new HashRing(['only-server']);
      expect(ring.get('test-key')).to.equal('only-server');
      expect(ring.get('another-key')).to.equal('only-server');
    });
  });

  describe('add', () => {
    it('should add a new server to the ring', () => {
      const ring = new HashRing(['server1', 'server2']);
      ring.add('server3');
      
      // The new server should be available for key routing
      let foundServer3 = false;
      for (let i = 0; i < 100; i++) {
        if (ring.get(`key-${i}`) === 'server3') {
          foundServer3 = true;
          break;
        }
      }
      expect(foundServer3).to.be.true;
    });

    it('should not add duplicate servers', () => {
      const ring = new HashRing(['server1', 'server2']);
      const initialContinuum = ring.getContinuum();
      
      ring.add('server1'); // Try to add existing server
      
      const finalContinuum = ring.getContinuum();
      expect(finalContinuum).to.have.length(initialContinuum.length);
    });

    it('should maintain key consistency after adding server', () => {
      const ring = new HashRing(['server1', 'server2']);
      const keysBefore = new Map<string, string>();
      
      // Record current mappings for some keys
      for (let i = 0; i < 50; i++) {
        const key = `key-${i}`;
        const server = ring.get(key);
        if (server) {
          keysBefore.set(key, server);
        }
      }
      
      ring.add('server3');
      
      // Most keys should still map to the same servers (some will move to server3)
      let consistentMappings = 0;
      keysBefore.forEach((originalServer, key) => {
        if (ring.get(key) === originalServer) {
          consistentMappings++;
        }
      });
      
      // Expect most keys to remain consistent
      expect(consistentMappings).to.be.greaterThan(keysBefore.size * 0.5);
    });
  });

  describe('remove', () => {
    it('should remove a server from the ring', () => {
      const ring = new HashRing(['server1', 'server2', 'server3']);
      ring.remove('server2');
      
      // server2 should no longer be returned
      for (let i = 0; i < 100; i++) {
        const server = ring.get(`key-${i}`);
        expect(server).to.not.equal('server2');
        expect(server).to.be.oneOf(['server1', 'server3']);
      }
    });

    it('should handle removing non-existent server', () => {
      const ring = new HashRing(['server1', 'server2']);
      const initialContinuum = ring.getContinuum();
      
      ring.remove('non-existent-server');
      
      const finalContinuum = ring.getContinuum();
      expect(finalContinuum).to.have.length(initialContinuum.length);
    });

    it('should handle removing all servers', () => {
      const ring = new HashRing(['server1']);
      ring.remove('server1');
      
      expect(ring.get('test-key')).to.be.null;
    });

    it('should redistribute keys after server removal', () => {
      const ring = new HashRing(['server1', 'server2', 'server3']);
      
      // Get some keys that map to server2
      const keysOnServer2: string[] = [];
      for (let i = 0; i < 100; i++) {
        const key = `key-${i}`;
        if (ring.get(key) === 'server2') {
          keysOnServer2.push(key);
        }
      }
      
      ring.remove('server2');
      
      // Those keys should now map to server1 or server3
      keysOnServer2.forEach(key => {
        const newServer = ring.get(key);
        expect(newServer).to.be.oneOf(['server1', 'server3']);
      });
    });
  });

  describe('getContinuum', () => {
    it('should return a copy of the continuum', () => {
      const ring = new HashRing(['server1', 'server2']);
      const continuum1 = ring.getContinuum();
      const continuum2 = ring.getContinuum();
      
      // Should be different objects (copies)
      expect(continuum1).to.not.equal(continuum2);
      // But with the same content
      expect(continuum1).to.deep.equal(continuum2);
    });

    it('should return sorted continuum by hash values', () => {
      const ring = new HashRing(['server1', 'server2', 'server3']);
      const continuum = ring.getContinuum();
      
      // Verify it's sorted by hash
      for (let i = 1; i < continuum.length; i++) {
        expect(continuum[i].hash).to.be.greaterThanOrEqual(continuum[i - 1].hash);
      }
    });

    it('should have correct number of entries', () => {
      const servers = ['server1', 'server2', 'server3'];
      const replicas = 150;
      const ring = new HashRing(servers, replicas);
      const continuum = ring.getContinuum();
      
      expect(continuum).to.have.length(servers.length * replicas);
    });
  });

  describe('hash distribution', () => {
    it('should provide reasonably even distribution', () => {
      const servers = ['server1', 'server2', 'server3', 'server4'];
      const ring = new HashRing(servers, 100);
      
      const serverCounts = new Map<string, number>();
      servers.forEach(server => serverCounts.set(server, 0));
      
      // Test with many keys
      const numKeys = 10000;
      for (let i = 0; i < numKeys; i++) {
        const server = ring.get(`key-${i}`);
        if (server) {
          serverCounts.set(server, (serverCounts.get(server) || 0) + 1);
        }
      }
      
      const expectedPerServer = numKeys / servers.length;
      const tolerance = expectedPerServer * 0.3; // 30% tolerance
      
      servers.forEach(server => {
        const count = serverCounts.get(server) || 0;
        expect(count).to.be.within(
          expectedPerServer - tolerance,
          expectedPerServer + tolerance
        );
      });
    });
  });

  describe('edge cases', () => {
    it('should handle keys with special characters', () => {
      const ring = new HashRing(['server1', 'server2']);
      
      const specialKeys = [
        'key with spaces',
        'key-with-dashes',
        'key_with_underscores',
        'key.with.dots',
        'key/with/slashes',
        'key@with@symbols',
        '日本語のキー',
        '🚀🌟💫'
      ];
      
      specialKeys.forEach(key => {
        const server = ring.get(key);
        expect(server).to.be.oneOf(['server1', 'server2']);
      });
    });

    it('should handle very long keys', () => {
      const ring = new HashRing(['server1', 'server2']);
      const longKey = 'a'.repeat(10000);
      
      const server = ring.get(longKey);
      expect(server).to.be.oneOf(['server1', 'server2']);
    });

    it('should handle empty string key', () => {
      const ring = new HashRing(['server1', 'server2']);
      const server = ring.get('');
      expect(server).to.be.oneOf(['server1', 'server2']);
    });
  });
}); 