function displaySportList(data){

	$('.sports-list').html("");

	for (let i = 0; i < data.sports.length; i ++){
		$('.sports-list').append(`<li>
									${data.sports[i].name}
								  </li>`);
	}

}

function onload(){
	let url = './sports/api/list-sports';
	let settings = {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON => {
			displaySportList(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
}

function updateSportList(data){
	$('.sports-list').append(`<li>
								${data.sport.name}
							  </li>`);
}

function addNewSport(name, id){

	let data = {
		name : name,
		id : id
	};

	let url = './sports/api/post-sport';
	let settings = {
						method : 'POST',
						headers : {
							'Content-Type' : 'application/json'
						},
						body : JSON.stringify(data)
					};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})
		.then(responseJSON => {
			updateSportList(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
}

function watchForm(){
	$('.sportForm').on('submit', function(event) {
		event.preventDefault();
		let name = $('.sportName').val();
		let id = $('.sportId').val();
		addNewSport(name, id);
	});
}

function init(){
	$(onload);
	$(watchForm);
}

$(init);
