async function SearchProfile() {

    let ProfileSec = document.getElementById('ProfileSec1');
    let ProfileSec2 = document.getElementById('ProfileSec2');
    ProfileSec.innerHTML = '';
    ProfileSec2.innerHTML = '';

    let Username = document.getElementById('SearchUsername');

    const api = await fetch(`https://api.github.com/users/${Username.value}`);
    let data = await api.json();
    console.log(data)

    if (data.message == 'Not Found') {
        alert('User is Not Availible')
    } else {
        
        let ProfileName = document.createElement('h1');
        ProfileName.textContent = data.name;
        
        let ProfileBtn = document.createElement('button');
        ProfileBtn.className = 'GithubBTN';
        ProfileBtn.textContent = 'Go to GitHub';
        ProfileBtn.onclick = ()=>{
            window.open(`https://github.com/${Username.value}`, '_blank').focus();
        }
        let ProfileBio = document.createElement('p');
        ProfileBio.textContent = data.bio;
        let ProfileFollowrs = document.createElement('p');
        let ProfileFollowing = document.createElement('p');
        ProfileFollowrs.textContent = `Followers: ${data.followers}`;
        ProfileFollowing.textContent = `Following: ${data.following}`;
        let ProfileRepo = document.createElement('p');
        ProfileRepo.textContent = `Repositories: ${data.public_repos}`;
        
    
        let ViewRepoBtn = document.createElement('button');
        ViewRepoBtn.className = 'repoBTN';
        ViewRepoBtn.textContent = 'View Repositiries';
        ViewRepoBtn.onclick = async ()=>{
            const RepoApi = await fetch(`https://api.github.com/users/${Username.value}/repos`);
            const repoData = await RepoApi.json();
         

            let RepoList = document.createElement('div');
            RepoList.className = 'repoList';

            repoData.forEach(e => {
                let repoItem = document.createElement('div');
                repoItem.className = 'repoItem';

                let repoItemName = document.createElement('h3');
                repoItemName.textContent = e.name;
                let repoItemBtn = document.createElement('button');
                repoItemBtn.className = 'GithubBTN2';
                repoItemBtn.textContent = 'View';
                repoItemBtn.onclick = ()=>{
                    window.open(`https://github.com/${Username.value}/${e.name}`, '_blank').focus();
                }
                let repoItemDesc = document.createElement('p');
                repoItemDesc.textContent = e.description;

                repoItem.appendChild(repoItemName);
                repoItem.appendChild(repoItemBtn);
                repoItem.appendChild(repoItemDesc);

                RepoList.appendChild(repoItem);
            });

            ProfileSec.appendChild(RepoList);


        }

        let EmailLink = document.createElement('a');
        EmailLink.className = 'fa fa-envelope';
        EmailLink.href = `mailto:${data.email}`
        let TwitterLink = document.createElement('a');
        TwitterLink.className = 'fa fa-twitter';
        TwitterLink.href = `https://twitter.com/${data.twitter_username}`
        let BlogLink = document.createElement('a');
        BlogLink.className = 'fa fa-link';
        BlogLink.href = data.blog;
        ProfileImage = document.createElement('img');
        ProfileImage.src = data.avatar_url;

        ProfileSec1.appendChild(ProfileName);
        ProfileSec1.appendChild(ProfileBtn);
        ProfileSec1.appendChild(ProfileBio);
        ProfileSec1.appendChild(ProfileRepo);
        ProfileSec1.appendChild(ProfileFollowrs);
        ProfileSec1.appendChild(ProfileFollowing);
        ProfileSec1.appendChild(ViewRepoBtn);
        ProfileSec1.appendChild(EmailLink);
        ProfileSec1.appendChild(TwitterLink);
        ProfileSec1.appendChild(BlogLink);
        ProfileSec2.appendChild(ProfileImage);
    }
}