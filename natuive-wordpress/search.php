<?php get_header(); ?>

	<main role="main" class="col34">
		<!-- section -->
		<section>

			<h1><?php echo sprintf( __( '%s Search Results for ', 'html5blank' ), $wp_query->found_posts ); echo get_search_query(); ?></h1>

			<?php get_template_part('loop'); ?>

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->
	</main>

<div class="col4"> <?php get_sidebar(); ?> </div>

<?php get_footer(); ?>
