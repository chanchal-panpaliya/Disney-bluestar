
const sidemenuItem = [
    {   id:1,
        name : "Profile " ,
        route : "/profile",
        Icon : <i className='fa-solid fa-user --background'></i>,
        cName: "nav-text"
    },
    {   id:2,
        name : "PlayLists" ,
        route : "/playlist",
        Icon : <i className="fa-solid fa-circle-play --background"></i>, 
        cName: "nav-text"
    },
    {   id:3,
        name : "Liked" ,
        route : "/liked",
        Icon : <i className="fa-solid fa-thumbs-up --background"></i>, 
        cName: "nav-text"
    },
    {   id:4,
        name : "Watch Later" ,
        route : "/watchlater",
        Icon : <i className="fa-solid fa-clock --background"></i>, 
        cName: "nav-text"
    },
    {   id:5,
        name : "History" ,
        route : "/history",
        Icon : <i className="fa-solid fa-clock-rotate-left --background"></i>, 
        cName: "nav-text"
    },
];


export default sidemenuItem;