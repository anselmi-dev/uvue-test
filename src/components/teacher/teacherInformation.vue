<template>
	<div class="teacher-information">
		<div id="teacher-header" class="teacher-information__container teacher-information__container--header">
			<div class="teacher-information__header">
				<teacher-head />
			</div>
		</div>
		<div class="teacher-information__container">
			<div class="row">
				<div class="teacher-information__main">
					<div class="teacher-information__content">
						<teacherBio />
						<teacherStatistics />
					</div>

					<div class="teacher-information__opinions">
						<teacherModalidad />
						<teacherLanguages />
						<teacherRequirements />
						<teacherReserve class="teacher-reserve--w100"/>
						<teacherVideo />
						<teacherCv />
					</div>
				</div>
				<div class="teacher-information__panel">
					<div class="teache-panel">
						<teacherReserve />
					</div>
				</div>
			</div>
		</div>
		<div class="teacher-information__container">
			<div class="teacher-information__main teacher-information__main--100">
				<teacherListOpinions />
				<teacherListRecommendations />
				<teacherSimilar />
			</div>
		</div>
	</div>
</template>

<script>
import StarRating from 'vue-star-rating'
import teacherVideo from './components/teacherVideo'
import teacherBio from './components/teacherBio'
import teacherSimilar from './opinions/teacherSimilar'
import teacherListOpinions from './opinions/teacherListOpinions'
import teacherStatistics from './statistics/teacherStatistics'
import teacherListRecommendations from './opinions/teacherListRecommendations'

import teacherCv from './components/teacherCv'
import teacherLanguages from './components/teacherLanguages'
import teacherModalidad from './components/teacherModalidad'
import teacherRequirements from './components/teacherRequirements'

import teacherReserve from './reserve/teacherReserve'
import teacherHead from './head/teacherHead'


export default {
	components: {
		StarRating,
		teacherSimilar,
		teacherListOpinions,
		teacherListRecommendations,
		teacherStatistics,
		teacherBio,
		teacherVideo,
		teacherReserve,
		teacherCv,
		teacherLanguages,
		teacherModalidad,
		teacherRequirements,
		teacherHead
	},
	mounted () {
		// (function(){
		// 	var doc = document.documentElement;
		// 	var w = window;
		// 	var prevScroll = w.scrollY || doc.scrollTop;
		// 	var curScroll;
		// 	const initial = document.getElementById('teacher-header').getElementsByClassName('teacher-information__header')[0].offsetHeight
		// 	// .offsetHeight
		// 	var toggleHeader = function(curScroll) {
		// 	    let header = document.getElementById('teacher-header')
		// 	    let head = header.getElementsByClassName('teacher-information__header')
		// 	    if (curScroll < 100) { 
		// 	    	// let pixel = initial - curScroll
		// 	    	// console.log(initial, curScroll)
		// 	    	// head[0].style.height = pixel + 'px'
		// 	    }
		//   	};
		//   	window.addEventListener('scroll', function() {
		//     	curScroll = w.scrollY || doc.scrollTop;
		//     	toggleHeader(curScroll);
		// 	});
		// })();
	}
}
</script>