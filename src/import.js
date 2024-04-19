export const getData = async function (store) {

	const dataRequest = process.env.NODE_ENV === 'production'
    ? await fetch("data/candidates.json")
    : await fetch("../../data/candidates.json")

	const data = await dataRequest.json()
	store.commit('initializeCandidatesData',data)

	store.commit("endImport",true)

	return true
}