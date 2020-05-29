<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Therese
 */

// Custom fields

$hero_image = get_field('hero_image');
$hero_logo = get_field('hero_logo');
$intro_text = get_field('intro_text');
$intro_color = get_field('intro_color');

$gars_title = get_field('les_gars_title');
$gars_fond = get_field('les_gars_fond');
$igor_nom = get_field('igor_nom');
$igor_image = get_field('igor_image');
$igor_instrument = get_field('igor_instrument');
$val_nom = get_field('val_nom');
$val_image = get_field('val_image');
$val_instrument = get_field('val_instrument');
$jp_nom = get_field('jp_nom');
$jp_image = get_field('jp_image');
$jp_instrument = get_field('jp_instrument');

$zik_title = get_field('zik_title');
$zik_text = get_field('zik_text');
$zik_color = get_field('zik_color');
$playlist_soundcloud = get_field('playlist_soundcloud');

$photos_title = get_field('photos_title');
$photos_bkg = get_field('photos_bkg');

$dates_title = get_field('dates_title');
$dates_content = get_field('dates_content');
$dates_color = get_field('dates_color');

$contact_title = get_field('contact_title');
$contact_email = get_field('contact_email');
$contact_color = get_field('contact_color');
$facebook = get_field('facebook');
$youtube = get_field('youtube');
$soundcloud = get_field('soundcloud');

get_header();
?>

	<section class="te__hero" style="background: url(<?php echo $hero_image['url']; ?>) center center no-repeat; background-size: cover;">
    <div class="te__hero__logo" style="background: url(assets/img/therese-electrique-logo-white-2.png) center center no-repeat; background-size: cover;"></div>
  </section>
  <section class="te__intro"  >
    <div class="te__intro__container">
      <div class="te__intro__text">
        <?php echo $intro_text; ?>
      </div>
    </div>
  </section>
  <section class="te__trio" style="background: url(<?php echo $gars_fond; ?>) bottom center no-repeat; background-size: cover;">
    <div class="te__trio__container">
      <h2 class="te__trio__title"><?php echo $gars_title; ?></h2>
      <div class="te__trio__item">
        <img src="<?php echo $val_image; ?>" class="te__trio__item__img">
        <div class="te__trio__item__desc">
          <h3 class="te__trio__item__title"><?php echo $val_nom; ?></h3>
          <p class="te__trio__item__text"><?php echo $val_instrument; ?></p>
        </div>
      </div>
      <div class="te__trio__item">
        <img src="<?php echo $igor_image; ?>" class="te__trio__item__img">
        <div class="te__trio__item__desc">
          <h3 class="te__trio__item__title"><?php echo $igor_nom; ?></h3>
          <p class="te__trio__item__text"><?php echo $igor_instrument; ?></p>
        </div>
      </div>
      <div class="te__trio__item">
        <img src="<?php echo $jp_image; ?>" class="te__trio__item__img">
        <div class="te__trio__item__desc">
          <h3 class="te__trio__item__title"><?php echo $jp_nom; ?></h3>
          <p class="te__trio__item__text"><?php echo $jp_instrument; ?></p>
        </div>
      </div>
    </div>
  </section>
  <section class="te__music" style="background-color: <?php echo $zik_color ?>">
    <div class="te__music__container">
      <div class="te__music__copy">
        <h2 class="te__music__title"><?php echo $zik_title; ?></h2>
        <p class="te__music__text"><?php echo $zik_text; ?></p>
      </div>
      <div class="te__music__soundcloud">
        <?php echo $playlist_soundcloud; ?>
      </div>
    </div>
  </section>
  <section class="te__gallery" style="background: url(<?php echo $photos_bkg; ?>) bottom center no-repeat; background-size: cover;">
    <h2 class="te__gallery__title">Les photos</h2>
    <div class="te__gallery__container">
      <div id="lightgallery">
        <?php
          //Get the images ids from the post_metadata
          $photo_gallery = acf_photo_gallery('photo_gallery', 22);
          //Check if return array has anything in it
          if( count($photo_gallery) ):
            //Cool, we got some data so now let's loop over it
            foreach($photo_gallery as $image):
                $id = $image['id']; // The attachment id of the media
                $full_image_url= $image['full_image_url']; //Full size image url
                $thumbnail_image_url= $image['thumbnail_image_url']; //Get the thumbnail size image url 150px by 150px
                $url= $image['url']; //Goto any link when clicked
                $alt = get_field('photo_gallery_alt', $id); //Get the alt which is a extra field (See below how to add extra fields)
        ?>
          <a href="<?php echo $full_image_url ?>" style="color:transparent">
            <img src="<?php echo $thumbnail_image_url ?>" />
          </a>
        <?php endforeach; endif; ?>
      </div>
    </div>
  </section>
  <section class="te__dates" style="background-color: <?php echo $dates_color ?>">
    <div class="te__dates__container">
      <h2><?php echo $dates_title; ?></h2>
      <?php echo $dates_content; ?>
    </div>
  </section>
  <section class="te__contact" style="background-color: <?php echo $contact_color ?>">
    <div class="te__contact__container">
      <h2 class="te__contact__title"><?php echo $contact_title ?></h2>
      <div class="te__contact__email">
        <a href="mailto:<?php echo $contact_email ?>"><?php echo $contact_email ?></a>
      </div>
      <div class="te__contact__social">
        <div class="te__contact__social__item">
          <a href="<?php echo $facebook ?>">
            <img style="width: 30px" src="assets/img/facebook.png" alt="Facebook" />
          </a>
        </div>
        <div class="te__contact__social__item">
          <a href="<?php echo $youtube ?>">
            <img style="width: 30px" src="assets/img/youtube.png" alt="Youtube" />
          </a>
        </div>
        <div class="te__contact__social__item">
          <a href="<?php echo $soundcloud ?>">
            <img style="width: 30px" src="assets/img/soundcloud.png" alt="SoundCloud" />
          </a>
        </div>
      </div>
    </div>
  </section>

<?php
get_footer();
