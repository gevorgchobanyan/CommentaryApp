<template>

	<div>
		<router-link to="/create-commentary"><h2>Add new Commentary</h2></router-link>
		<div class="list-group">
			<div v-for="(comment, index) in comments" :key="comment._id" 
				 class="list-group-item list-group-item-action " 
				 aria-current="true"
			>
				<div class="d-flex w-100 justify-content-between">
					<h5 class="mb-1">Commentary {{index + 1}}</h5>
					<small>votes {{comment.votes}}</small>
				</div>
				<p> {{comment.comment}} </p>
				<button type="button" class="btn btn-secondary" @click="upVoteComment(comment)">up vote</button> &nbsp;
				<button type="button" class="btn btn-secondary" @click="downVoteComment(comment)">down vote</button>
			</div>
		</div>
		
	</div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	methods:{
		...mapActions([
			'getComments',
			'upVoteComment',
			'downVoteComment',
		]),
	},
	computed: {
		...mapGetters([
			'comments'
		])
	},
	created(){
		this.getComments()
	}

}
</script>

<style>
p {
  word-wrap: break-word;
}
</style>