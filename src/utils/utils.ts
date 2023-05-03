export function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function deepCopy(original: any) {
	return JSON.parse(JSON.stringify(original))
}