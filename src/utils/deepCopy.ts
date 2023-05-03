export default function deepCopy(original: any) {
	return JSON.parse(JSON.stringify(original))
}