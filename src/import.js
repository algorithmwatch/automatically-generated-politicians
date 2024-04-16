export const getData = async function (store) {

	const dataRequest = await fetch("../data/candidates.json")
	const data = await dataRequest.json()
	store.commit('initializeCandidatesData',data)

	store.commit("endImport",true)

	return true
}