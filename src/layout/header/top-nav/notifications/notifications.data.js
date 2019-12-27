import avatar1 from '../../../../assets/img/avatar1.jpg'

const NOTIFICATIONS = 
    [
        {
            avatarUrl:avatar1,
            notifType:'acceptInvitation',
            notifTime:'12m',
            notifUserName:'Felix'
        },
        {
            avatarUrl:avatar1,
            notifType:'newMsg',
            notifTime:'1h',
            notifUserName:'Ful',
            avatarStyle:'',
        },
        {
            avatarUrl:'',
            notifType:'applicationPendingApproval',
            notifTime:'1d',
            avatarIco:'account',
            notifUserName: 'CHI',
            avatarStyle:'',
        },
        {
            avatarUrl:'',
            notifType:'applicationPendingApproval',
            notifTime:'1d',
            avatarIco:'account-o',
            notifUserName: 'Irene Nalova',
            avatarStyle:'',
        },
        {
            avatarUrl:'',
            notifType:'applicationPendingApproval',
            notifTime:'1d',
            avatarIco:'coffee',
            notifUserName: 'Patience Ozoquo',
            avatarStyle:'',
        },
        {
            avatarUrl:'',
            notifType:'followUp',
            notifTime:'12w',
            avatarIco:'face',
            notifUserName:'Manager',
            avatarStyle:'avatar-text-warning',
        },
    ]


export default NOTIFICATIONS;