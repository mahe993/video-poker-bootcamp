/** @callback checkUsernames func to check for clashing usernames in arr.some */
const checkUsernames = (x) => x.username.toUpperCase() === inputUsername.value.toUpperCase();

/** @function clickPlay eventlistener func for onclick on Play button */
const clickPlay = () => {
  if (inputUsername.value === '' || inputBalance.value === '') {
    return alert('Username or Starting balance cannot be empty!');
  }
  if (inputBalance.value < 10 || inputBalance.value > 100) {
    return alert('Please enter a starting balance between $10 - $100!');
  }
  if (userInfo.some(checkUsernames)) {
    return alert('Username already in use, please choose another!');
  }
  const userInfoObject = { username: inputUsername.value, bankBalance: inputBalance.value };
  userInfo.push(userInfoObject);
  console.log(userInfo);
  loginBox.classList.add('rotation');
  styleBox.classList.add('rotation');
  registrationPage.classList.add('fade');
  audioWhiteNoise.play();
  audioEntryNoise.play();
};

/** @event click event for Play button */
playBtn.addEventListener('click', clickPlay);
