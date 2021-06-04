let scrapingUrls = [
    "https://www.instagram.com/accounts/access_tool/account_privacy_changes?__a=1",
    "https://www.instagram.com/accounts/access_tool/password_changes?__a=1",
    "https://www.instagram.com/accounts/access_tool/former_emails?__a=1",
    "https://www.instagram.com/accounts/access_tool/former_phones?__a=1",
    "https://www.instagram.com/accounts/access_tool/current_follow_requests?__a=1",
    "https://www.instagram.com/accounts/access_tool/accounts_following_you?__a=1",
    "https://www.instagram.com/accounts/access_tool/accounts_you_follow?__a=1",
    "https://www.instagram.com/accounts/access_tool/hashtags_you_follow?__a=1",
    "https://www.instagram.com/accounts/access_tool/accounts_you_blocked?__a=1",
    "https://www.instagram.com/accounts/access_tool/logins?__a=1",
    "https://www.instagram.com/accounts/access_tool/logouts?__a=1",
    "https://www.instagram.com/accounts/access_tool/search_history?__a=1",
    "https://www.instagram.com/accounts/access_tool/former_usernames?__a=1",
    "https://www.instagram.com/accounts/access_tool/former_full_names?__a=1",
    "https://www.instagram.com/accounts/access_tool/former_bio_texts?__a=1",
    "https://www.instagram.com/accounts/access_tool/former_links_in_bio?__a=1",
    "https://www.instagram.com/accounts/access_tool/story_poll_votes?__a=1",
    "https://www.instagram.com/accounts/access_tool/story_emoji_slider_votes?__a=1",
    "https://www.instagram.com/accounts/access_tool/story_question_responses?__a=1",
    "https://www.instagram.com/accounts/access_tool/story_question_music_responses?__a=1",
    "https://www.instagram.com/accounts/access_tool/story_countdown_follows?__a=1",
    "https://www.instagram.com/accounts/access_tool/story_quiz_responses?__a=1",
    "https://www.instagram.com/accounts/access_tool/ads_interests?__a=1"
]

async function fetchJsonFromAPI() {

    // Now we do all API requests in order to retrieve the data
    let responses = await Promise.all(
        scrapingUrls.map(url =>
            fetch(url).then(response => response.json())
        )
    );

    // We transform the data so that we can return it as json
    responses = responses.map(response => {
        return {
            data_category: response.page_name,
            data: response.data.data
        };
    });
    return JSON.stringify(responses, null, 4)
}

export async function download() {
    // Fetch the data from the instagram API
    let responses = await fetchJsonFromAPI();
    
    // For now we can offer a download:
	let blob = new Blob( [ responses ], { type: 'data:text/json;charset=utf-8m'	});
	let url = URL.createObjectURL( blob );
    chrome.downloads.download({
        url: url,
        filename: 'instagram_data.json'
    });
}