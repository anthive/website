import axios from "axios";

const esAxios = axios.create({
	baseURL: 'https://search.anthive.io/',
	timeout: 3000
});

class Search  {
	wrap(query) {
		return { params: {
				source: JSON.stringify(query),
				source_content_type: 'application/json'
			}
		};
	}

  	async searchGames(sort, page, size, filter) {
		const handle = "/games-prod/_search";
			const query = {
				size: size,
				sort: sort,
				from: size*(page-1),
				query: { bool: { filter: filter }}
			};
		//console.log("filters",filter);
		// delete if not need more
		const resp = await esAxios.get(handle, this.wrap(query));
		if (resp.status == 200) {
			return resp.data.hits;
		}
		return null;
  	}
}

export default new Search();
