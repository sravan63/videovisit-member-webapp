const _rootUrl = '/';

const GlobalConfig = {
    KAISER_PERMANENTE: 'Kaiser Permanente',
    HOME_URL: _rootUrl,
    VIDEO_VISIT_ROOM_URL: _rootUrl + 'videoVisitReady',
    LOGIN_URL: _rootUrl + 'login',
    MEETINGS_URL: _rootUrl + 'myMeetings',
    AUTO_REFRESH_TIMER: '180000',
    RUNNING_LATE_TIMER: 120000,
    SIGNOUT_MEMBER_ALONE: 2700000,
    MEMBER_GROUP: ['GUEST_MEMBER', 'MEMBER_PROXY', 'NONMEMBER_PROXY', 'PATIENT'],
    PATIENT_GROUP: ['GUEST_MEMBER', 'MEMBER_PROXY', 'NONMEMBER_PROXY', 'PATIENT'],
    CALLING_ROLE: 'DIAL_OUT',
    GUEST_ROLE: 'GUEST_MEMBER',
    NONMEMBER_PROXY: 'NONMEMBER_PROXY',
    MEMBER_PROXY: 'MEMBER_PROXY',
    PATIENT_ROLE: 'PATIENT',
    PATIENT_IDTYPE: 'GUID',
    CHAIR_ROLE: 'chair',
    HOST_ROLE: 'PROVIDER',
    INTERPRETER_DISPLAYNAME: 'Interpreter Service',
    DIALOUT_DISPLAYNAME: 'Dial Out',
    INTERPRETER_ROLE: 'INTERPRETER',
    INTERPRETER_STATE_CONNECTING: 'connecting',
    INTERPRETER_STATE_FAILED: 'failed',
    INTERPRETER_STATE_SUCCESS: 'success',
    INVITE_USER_TYPE_EMAIL: 'EMAIL',
    AUDIO_ONLY_USERS_GUEST: 'DIAL_OUT',
    CLINICIAN_BY_KPHC: 'clinician-by-kphc',
    INTERPRETER_INVITE: 'interpreter',
    PHONE_REF: 'phone',
    EMAIL_REF: 'email',
    TEST_CALL_FINISHED: 'Test call finished',
    MEDIA_DATA_READY: 'Media Data Ready',
    NOTIFY_USER: 'Notify User',
    MEMBER_READY: 'Member Ready',
    HOST_AVAIL: 'Host Availble',
    HOST_LEFT: 'Host left',
    HAS_MORE_PARTICIPANTS: 'More participants',
    JOINED_VISIT: 'has joined the visit.',
    LEFT_VISIT: 'has left the visit.',
    PRESENTATION_ON: 'has initiated desktop sharing.',
    PRESENTATION_OFF: 'has stopped desktop sharing.',
    LOGIN_TYPE: {
        TEMP: 'tempAccess',
        SSO: 'sso',
        GUEST: 'guest'
    },
    VIDEO_MUTE: 'Mute Video',
    VIDEO_UNMUTE: 'Unmute Video',
    AUDIO_MUTE: 'Mute Audio',
    AUDIO_UNMUTE: 'Unmute Audio',
    VIDEO: 'video',
    AUDIO: 'audio',
    MICROPHONE: 'microphone',
    MICROPHONE_MUTE: 'Mute Microphone',
    MICROPHONE_UNMUTE: 'Unmute Microphone',
    STRING_FORMAT: ['capitalize', 'uppercase', 'lowercase'],
    ACCESS_MEMBER_NAME: 'send member name',
    GUEST_VALIDATE_MEETING_ERROR_MSG: 'The video visit you are trying to join is not currently available.',
    GUEST_FUTURE_MEETING:'Your visit is not ready yet, try again closer to the scheduled time.',
    GUEST_LOGIN_ERROR_MSG: 'Some exception occurred while processing request.',
    GUEST_LOGIN_VALIDATION_MSG: 'No matching patient found. Please try again.',
    SHOW_CONFERENCE_DETAILS: 'show conference details',
    UPDATE_RUNNING_LATE: 'update running late in sidebar',
    LEAVE_VISIT: 'leave meeting',
    TOGGLE_SETTINGS: 'toggle settings',
    CLOSE_SETTINGS: 'closed settings',
    LOGOUT: 'User Signed Out',
    START_SCREENSHARE: 'start screenshare',
    STOP_SCREENSHARE: 'stop screenshare',
    USER_JOINED: 'user joined',
    USER_LEFT: 'user left',
    ERROR_PAGE: _rootUrl + 'authenticationFailed',
    ENABLE_IOS_CAM:'Enable IOS cam',
    INAPP_LEAVEMEETING:'Leave Meeting InApp',
    CAMERA_FLIP:'Show Mirror Image',
    OPEN_MODAL: 'open popup',
    CLOSE_MODAL: 'popup closed',
    CLOSE_MODAL_AUTOMATICALLY: 'close popup automatically',
    OPEN_INFO_MODAL: 'open info popup',
    CLOSE_INFO_MODAL: 'info popup closed',
    TOGGLE_MOBILE_FOOTER: 'Mobile Footer Toggle',
    MEDIA_STATS_DATA:'StoreMedia Stats',
    REMOVE_DUPLICATES:'Member alone',
    MEDIA_PERMISSION:'Permission Denied',
    RENDER_VIDEO_DOM:'Show Video DOM ',
    HIDE_LOADER:'hide loader',
    OPEN_SURVEY_MODAL: 'open survey popup',
    CLOSE_SURVEY_MODAL: 'survey popup closed',
    CLOSE_SURVEY_MODAL_AUTOMATICALLY: 'close survey popup automatically',
    SPOTLIGHT:'spotlight participant',
    UNSPOTLIGHT:'unspotlight participant',
    DUPLICATE_NAME: 'DUPLICATE_MEMBER#',
    UPDATE_DUPLICATE_MEMBERS_TO_SIDEBAR: 'UPDATE DUPLICATE MEMBERS TO SIDEBAR',
    ACTIVESPEAKER:'bold participant',
    NOTACTIVESPEAKER:'unbold participant',
    LANGUAGE_CHANGED:'language changed',
    ICE_GATHERING_COMPLETE: 'IceGatheringComplete',
    NETWORK_CONNECTION_SUCCESS: 'NetworkConnectionSuccess',
    NETWORK_RECONNECTING: 'NetworkReconnecting',
    FAILED_MID_WAY: 'CallFailedMidway',
    CALL_CONNECTED: 'CallConnected',
    CALL_DISCONNECTED: 'CallDisconnected',
    WEEK_DAYS: {
        chinese: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
        english: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        spanish: ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."]
    },
    MONTHS: {
        chinese: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        english: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        spanish: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."]
    }
};

export default GlobalConfig;
