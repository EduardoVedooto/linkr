function SortList(array) {

    const following = array.filter(elem => elem.isFollowingLoggedUser);
    const notFollowing = array.filter(elem => !(elem.isFollowingLoggedUser));

    return [].concat(following, notFollowing);
}

export default SortList;