const _rootUrl = '/';

const GlobalConfig = {
    KAISER_PERMANENTE: 'Kaiser Permanente',
    HOME_URL: _rootUrl,
    VIDEO_VISIT_ROOM_URL: _rootUrl + 'videoVisitReady',
    LOGIN_URL: _rootUrl + 'login',
    MEETINGS_URL: _rootUrl + 'myMeetings',
    AUTO_REFRESH_TIMER: '180000',
    RUNNING_LATE_TIMER : 120000,
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
    TEST_CALL_FINISHED : 'Test call finished',
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
    VIDEO_MUTE : 'Mute Video',
    VIDEO_UNMUTE : 'Unmute Video',
    AUDIO_MUTE:'Mute Audio',
    AUDIO_UNMUTE:'Unmute Audio',
    VIDEO: 'video',
    AUDIO:'audio',
    MICROPHONE:'microphone',
    MICROPHONE_MUTE : 'Mute Microphone',
    MICROPHONE_UNMUTE : 'Unmute Microphone'
};

export default GlobalConfig;
