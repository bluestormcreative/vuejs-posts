// ./app.js
const CATEGORIES = "home, arts, automobiles, books, business, fashion, food, health, insider, magazine, movies, national, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, tmagazine, travel, upshot, world"; // From NYTimes

const NYTBaseUrl = "https://api.nytimes.com/svc/topstories/v2/";
const ApiKey     = "379673c2b40c472c82135760c140dadd";

function buildUrl ( urlCategory ) {
	return NYTBaseUrl + urlCategory + ".json?api-key=" + ApiKey
}

const vm = new Vue({
	el: '#app',
	data: {
		results: [],
		categories: CATEGORIES.split(', '), // create an array of the categories
		category: 'home', // set default category to 'home
	},
	mounted() {
		this.getPosts( this.category );
	},
	methods: {
		getPosts( category ) {
			// use the build url function to change the api url depending on the category selected.
			let url = buildUrl( category );

			// then use axios to fetch the url and update our results to use this new fetched data.
			axios.get( url ).then(( response ) => {
				this.results = response.data.results;
				}).catch( error => { console.log( error );
			});
		}
	},
	filters: {
		capitalize( string ) {
			return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
		}
	}
});

Vue.component('news-grid', {
	props: [ 'results' ],
	template: `
	<section class="grid-container grid-container-padding">
		<div class="grid-x grid-margin-x">
			<div class="cell medium-4" v-for="result in results">
				<div class="card">
					<img v-if="result.multimedia.length" :src="result.multimedia[3].url" >
					<div class="card-divider">
						{{ result.title }}
					</div>
					<div class="card-section">
						<p>{{ result.abstract }}.</p>
					</div>
				</div>
			</div>
		  </div>
	  </div>
  </section>
	`
});
