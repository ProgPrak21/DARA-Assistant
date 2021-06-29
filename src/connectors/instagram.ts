export const name = 'instagram';
export const hostname = 'instagram.com';
export const requestUrl = 'https://www.instagram.com/download/request/';
export const actions = ['request', 'download']
export const description = "";


export const request = async () => {
    const radio = document.getElementById('igCoreRadioButtonoutputFormatJSON')
    if (radio) {
        (<any>document.getElementById('igCoreRadioButtonoutputFormatJSON')).checked = true;
        (<any>document.querySelector('form > div > button')).click();
        chrome.runtime.sendMessage({ actionResponse: "Please enter your password." });
    }
}

export const download = async () => {
    const scrapingUrls = [
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
    // Fetch the data from the instagram API
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
    const responsesJson = JSON.stringify(responses, null, 4);

    // For now we can offer a download:
    let blob = new Blob([responsesJson], { type: 'data:text/json;charset=utf-8m' });
    let url = URL.createObjectURL(blob);
    chrome.runtime.sendMessage({ downloadUrl: url, downloadName: 'instagram_data.json' });
    chrome.runtime.sendMessage({ actionResponse: "Your Download is ready." });
}