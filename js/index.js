let aKey = "AIzaSyAR9qtEZGLZCNfmQSWqowE8Mqk1W6y89Ms";
let sVid;
function getFetch(searchTerm,callback){
	$.ajax({
	url:"https://www.googleapis.com/youtube/v3/search",
	method: "GET",
	data: {key: aKey,
		q: searchTerm,
		maxResults: 15,
		part: "snippet",
		type: "video"
		},
	dataType: "json",
	success: responseJson => callback(responseJson),
	error: err => console.log(err)
	});
}
function newPage(pagelink,callback){
	$.ajax({
		url:"https://www.googleapis.com/youtube/v3/search",
		method: "GET",
		data:{key: aKey,
			q : sVid,
			maxResults: 10,
			part: "snippet",
			type: "video",
			pageToken: pagelink
		},
	dataType: "json",
	success: responseJson => callback(responseJson),
	error: err => console.log(err)
	});
}

function ShowRes(data){
	$('.resultados').html('');
	console.log(data);
	$.each(data.items, function(i,vid){
		let videoLink = `https://www.youtube.com/watch?v=${vid.id.videoId}`;
		let videoImage = vid.snippet.thumbnails.medium.url;
		let videoTitle = vid.snippet.title;

		$('.resultados').append(`

			<div class="segment">
					<a href = ${videoLink} target="_blank">
						<img src = ${videoImage} alt="videoThumbnail">
						<p>${videoTitle}</p>
					</a>
			</div>

			`);
	});



	if(data.nextPageToken)
	{
		$("#nPage").attr("page",data.nextPageToken);
		$("#nPage").show();
	}else
	{
		$("#nPage").hide();
	}

	if(data.prevPageToken)
	{
		$("#pPage").attr("page",data.prevPageToken);
		$("#pPage").show();
	}else
	{
		$("#pPage").hide();
	}
}

function watch(){
	$('.videoF').on('submit', (event)=> {
		event.preventDefault();

		let vName = $('#searcbox').val();
		sVid = vName;
		getFetch(vName,ShowRes);
	});
}

$('#nPage').on('click', (event)=> {
	event.preventDefault();
	newPage($("#nPage").attr("page"),ShowRes);
});

$('#pPage').on('click', (event)=> {
	event.preventDefault();
	newPage($('#pPage').attr("page"),ShowRes);
});

$(watch);
