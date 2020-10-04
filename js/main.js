const website = (function() {
	const SELECTORS = {
		body: $('body'),
		controlsCloseBtn: $('.controls__close'),
		hiddenArticle: $('article.is-hidden'),
		articlesNotHidden: $('article:not(.is-hidden)'),
		meme: $('.meme'),
		memeImage: $('.meme__image'),
		score: $('.score'),
		socialMedia: $('.js-social-media'),
		socialMediaTxt: $('.social-media__text'),
		binIcon : $('.js-bin-icon'),
		trump: $('.trump'),
		asideTrigger: $('.js-aside-trigger'),
		windowWidth: $(window).width(),
	}

	const CLASSNAMES = {
		isClosed: 'is-closed',
	}

	const ANIM_SPEEDS = {
		slow: 500,
		normal: 250,
		fast: 125,
	}

	const TABLET_LANDSCAPE_PLUS = SELECTORS.windowWidth > 1024;

	function showScoreAfterClosingContent(parentArticle) {
		parentArticle.find(SELECTORS.score).fadeTo(ANIM_SPEEDS.fast, 1)

		setTimeout(function() { 
			SELECTORS.score.fadeTo(ANIM_SPEEDS.fast, 0)
		}, ANIM_SPEEDS.fast)
	}

	function showThisShitWhenAllContentsAreClosed(articlesClosed) {
		const articlesLength = SELECTORS.articlesNotHidden.length

		if (articlesLength === articlesClosed) {
			SELECTORS.hiddenArticle.delay(ANIM_SPEEDS.slow).slideDown(ANIM_SPEEDS.normal)
		}
	}

	let articlesClosed = 0;

	function onArticleCloseHandler() {
		const thisss = this;
		const parentArticle = $(thisss).parents('header').parent()

		articlesClosed++

		if (TABLET_LANDSCAPE_PLUS) {
			showScoreAfterClosingContent(parentArticle)
		}

		showThisShitWhenAllContentsAreClosed(articlesClosed)

		parentArticle.delay(ANIM_SPEEDS.normal).slideUp(ANIM_SPEEDS.normal, function() {
			parentArticle.addClass(CLASSNAMES.isClosed)
		});
	}

	let hovered = 0

	function onMemeHandler() {
		const randomIndex = Math.floor(Math.random() * 5),
			imagesArr = ['1.gif', '2.gif', '3.gif', '4.gif', '5.gif', '6.gif'],
			memeSpanText = SELECTORS.meme.find('span')

		hovered++
		SELECTORS.memeImage.attr('src', `images/memes/${imagesArr[randomIndex]}`)

		if (hovered > 0) {
			memeSpanText.text('HOVER OVER ME AGAIN')
		}

		if (hovered > 3) {
			memeSpanText.text('KEEP HOVERING')
		}

		if (hovered > 5) {
			memeSpanText.text('WOW, MUCH HOVERING')
		}
	}

	function setSocialMediaMessage(socialmedia, msg) {
		return SELECTORS.socialMediaTxt.html(`<strong style='font-weight: 500'>${socialmedia}?</strong> <br/> ${msg}`)
	}

	function mapSocialMediaMessage(socialmedia) {
		switch(socialmedia) {
			case 'tiktok':
				return setSocialMediaMessage(socialmedia, "I'm mentally stable")
			case 'snapchat':
				return setSocialMediaMessage(socialmedia, "That's cap")
			case 'twitter':
				return setSocialMediaMessage(socialmedia, 'No')
			case 'github':
				return setSocialMediaMessage(socialmedia, 'Now we &lt;p&gt;talkin&lt;/p&gt;')
			case 'linkedin':
				return setSocialMediaMessage(socialmedia, "Let's get connected")
			case 'facebook':
			default:
				return setSocialMediaMessage(socialmedia, "I ain't got no time for that")
		}
	}

	function onSocialMediaHandler() {
		const thisss = this
		socialmedia = $(thisss).data('socialmedia')
		mapSocialMediaMessage(socialmedia)
	}

	function onAsideThingsHandler() {
		const thisss = this
		$(thisss).parents('.js-aside').find('.aside__content').slideToggle(ANIM_SPEEDS.normal)
	}

	function bindElements() {
		SELECTORS.controlsCloseBtn.on('click', onArticleCloseHandler)
		SELECTORS.meme.on('mouseenter', onMemeHandler)
		SELECTORS.socialMedia.on('mouseenter', onSocialMediaHandler)
		SELECTORS.asideTrigger.on('click', onAsideThingsHandler)
	}

	// FOR V2:
	// function browserIsIE() {
	// 	return document.documentMode
	// }

	// function setIeClassToBody() {
	// 	if (browserIsIE()) {
	// 		SELECTORS.body.addClass('ie')
	// 	}
	// }

	function setCustomCursors() {
		if (TABLET_LANDSCAPE_PLUS) {
			new springyEmojiCursor({
				element: document.querySelector("article:nth-child(1)"),
				emoji: ["🤡"]
			});
			
			new springyEmojiCursor({
				element: document.querySelector("article:nth-child(2)"),
				emoji: ["🎓"]
			});
			
			new springyEmojiCursor({
				element: document.querySelector("article:nth-child(3)"),
				emoji: ["😂"]
			});
			
			new springyEmojiCursor({
				element: document.querySelector("article:nth-child(4)"),
				emoji: ["💌"]
			});
		}
	}

	return {
		bindElements,
		setCustomCursors,
		// setIeClassToBody,
	};
})();

website.bindElements()
website.setCustomCursors()
// website.setIeClassToBody()


