import { boxMuller } from "../math/probability/boxMuller";

export async function waitGaussian(mean: number, std: number): Promise<number> {
    return new Promise((resolve) => {
        const delay = boxMuller(mean, std);
        const timeoutDelay = delay < 0 ? 0 : delay;
        setTimeout(() => {
            resolve(delay);
        }, timeoutDelay);
    });
}
