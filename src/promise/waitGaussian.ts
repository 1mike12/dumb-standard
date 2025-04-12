import {boxMuller} from "../math/boxMuller";

export async function waitGaussian(mean: number, std: number): Promise<number> {
    return new Promise((resolve) => {
        const delay = boxMuller(mean, std);
        setTimeout(() => {
            resolve(delay);
        }, delay);
    });
}
