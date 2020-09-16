var JOBS = require('../constants/jobs');
var MATCHING = require('../constants/matching');
var MAIN = require('../constants/main')
var CURRENT_INDUSTRIES = JOBS.CURRENT_INDUSTRIES;
// var CURRENT_EXPERIENCE = JOBS.CURRENT_EXPERIENCE;
// var CURRENT_JOBS_PARENTS = JOBS.CURRENT_JOBS_PARENTS;
// var CURRENT_EXPERIENCE_PARENTS = JOBS.CURRENT_EXPERIENCE_PARENTS;
var CURRENT_JOBS = JOBS.CURRENT_JOBS;
var ROLES = require('../constants/roles');
// var uuid = require('node-uuid');
// var encrypt = require('../helpers/crypter')

var USER_A_ID = "02109cb7-eab3-429e-90fa-041e255f8ad2"
var USER_B_ID = "02109cb7-eab3-429e-90fa-041e255f8ad3"
var USER_C_ID = "02109cb7-eab3-429e-90fa-041e255f8888"
var USER_D_ID = "02109cb7-eab3-429e-90fa-041e255f8831"
var USER_E_ID = "02109cb7-eab3-429e-90fa-041e255f8839"
var USER_F_ID = "02109cb7-eab3-429e-90fa-041e255f8h34"
var USER_G_ID = "02109cb7-eab3-429e-90fa-041e255f8833"
var CANDIDATE_A_ID = "02109cb7-eab3-429e-90fa-041e255f8ad4"
var CANDIDATE_B_ID = "02109cb7-eab3-429e-90fa-041e255f8ad5"
var CANDIDATE_C_ID = "02109cb7-eab3-429e-90fa-041e255f8ad6"
var COMPANY_A_ID = "02109cb7-eab3-429e-90fa-041e255f8ad0"
var COMPANY_B_ID = "02109cb7-eab3-429e-90fa-041e255f8ad7"
var RECRUITER_A_ID = "02109cb7-eab3-429e-90fa-041e255f8ad8"
var RECRUITER_B_ID = "02109cb7-eab3-429e-90fa-041e255f8ad9"
var ADMIN_ID = "02109cb7-eab3-429e-90fa-041e255f8ad1"
let VACANCY_A_ID = "5f612095947fac392c432ce2"
let VACANCY_B_ID = "5f612144947fac392c432ce3"
var passwordHash = "$2a$10$9rd00HEVTQSzdnXDG46fJOUrGnhDmqZWZtUYgxlLYFNgBc9T8oqdm"



var fields = {
    "_candidate": "",
    "_company": "",
    "_vacancy": "",
    "score": 90,
    "breakdown": {},
    "isApproved": false  
}

var uploads = require('./uploads.json')

var USERS = [
    {
        _id: USER_A_ID,
        email: 'alan.smith@mail.com',
        password: 'password',
        model: 'Candidate',
        role: ROLES.CANDIDATE,
        isApproved: true,
        isConfirmed: true,
        _candidate: CANDIDATE_A_ID,
    },
    {
        _id: USER_B_ID,
        email: 'bob.smith@mail.com',
        password: 'password',
        model: 'Candidate',
        role: ROLES.CANDIDATE,
        _candidate: CANDIDATE_B_ID,
    }
    ,
    {
        _id: USER_C_ID,
        email: 'rebecca@mail.com',
        password: 'password',
        model: 'Recruiter',
        role: ROLES.RECRUITER,
        isApproved: true,
        isConfirmed: true,
        _recruiter: RECRUITER_A_ID,
        _company: COMPANY_A_ID,
    }
    ,
    {
        _id: USER_D_ID,
        email: 'tyler@mail.com',
        password: 'password',
        model: 'Recruiter',
        role: ROLES.RECRUITER,
        isApproved: true,
        isConfirmed: true,

        _recruiter: RECRUITER_B_ID,
        _company: COMPANY_B_ID,
    }
    ,
    {
        _id: USER_E_ID,
        email: 'elon.musk@mail.com',
        password: 'password',
        model: 'Candidate',
        role: ROLES.CANDIDATE,
        isApproved: true,
        isConfirmed: true,

        _candidate: CANDIDATE_C_ID,
    }
    ,
    {
        _id: ADMIN_ID,
        email: 'admin@pumpt.com',
        password: 'password',
        model: 'Admin',
        role: ROLES.ADMIN,
        isApproved: true,
        isConfirmed: true
    }

]
var CANDIDATES = [
    {
        _id: CANDIDATE_A_ID,
        user: USER_A_ID,
        firstName: 'Alan',
        lastName: 'Smith',
        education: [],

        preferredCompanySize: MATCHING.EMPLOYEES_AMOUNT.gt10lt50,

        recentJob: CURRENT_JOBS[0],

        interestWorkingArea: [CURRENT_INDUSTRIES[0]],

        recentWorkingAreas: [{ parent: 'Sales', value: 'Ad Tech/Platform' }],
        //recentWorkingAreaParent: 'Sales',

        recentAreaExperience: MATCHING.EXPERIENCE.gt0lt2,
        recentAnnualIncome: MATCHING.RECENT_ANNUAL_INCOME.lt100,

        valueAssessments: [
            MATCHING.VALUE_ASSESSMENT.companyCulture, MATCHING.VALUE_ASSESSMENT.companyMission, MATCHING.VALUE_ASSESSMENT.competitive
        ],

        avatar: uploads['alan-avatar'],

        socialMedia: {
            linkedInUrl: 'https://www.linkedin.com/in/chip-kennedy',
            twitterAcc: '@chippykennedy'
        },

        location: "New York, NY, United States",
        abilityToRelocate: false,
        workingExperience: [
        ],
        employments: [MATCHING.EMPLOYMENT.FULL_TIME]
    }
    ,
    {
        _id: CANDIDATE_B_ID,
        user: USER_B_ID,
        firstName: 'Bob',
        lastName: 'Smith',

        education: [{
            schoolName: 'Case Western Reserve University', // top
            specialty: 'Computer Science',
            startStudyAt: '2012',
            endStudyAt: '2014',
            degree: MATCHING.DEGREE.UNDERGRADUATEDEGREE
        }],

        preferredCompanySize: MATCHING.EMPLOYEES_AMOUNT.gt10lt50,

        recentJob: 'Account Manager',

        interestWorkingArea: ['Digital Media'],

        recentWorkingAreas: [{ value: 'Digital', parent: 'Account Management' }],

        recentAreaExperience: MATCHING.EXPERIENCE.gt2lt5,
        recentAnnualIncome: MATCHING.RECENT_ANNUAL_INCOME.gt100lt150,

        valueAssessments: [
            MATCHING.VALUE_ASSESSMENT.companyCulture, MATCHING.VALUE_ASSESSMENT.companyMission, MATCHING.VALUE_ASSESSMENT.competitive
        ],

        avatar: uploads['bob-avatar'],

        socialMedia: {
            linkedInUrl: 'https://www.linkedin.com/in/chip-kennedy',
            twitterAcc: '@chippykennedy'
        },

        location: "Boston, MA, United States",
        abilityToRelocate: true,
        workingExperience: [
            {
                companyName: 'Chip Kennedy Consulting LLC',
                position: 'Lead Engineer',
                location: 'New York, NY',
                duty: 'Worked Hard',
                startWorkingAt: '02/2012',
                isCurrentJob: true
            }
        ],
        employments: [MATCHING.EMPLOYMENT.PART_TIME]
    }
    ,
    {
        _id: CANDIDATE_C_ID,
        user: USER_E_ID,
        firstName: 'Elon',
        lastName: 'Musk',

        education: [{
            schoolName: 'Tesla University', // top
            specialty: 'Rocket Science',
            startStudyAt: '2012',
            endStudyAt: '2014',
            degree: MATCHING.DEGREE.UNDERGRADUATEDEGREE
        }],

        preferredCompanySize: MATCHING.EMPLOYEES_AMOUNT.gt10lt50,

        recentJob: CURRENT_JOBS[0],

        interestWorkingArea: [CURRENT_INDUSTRIES[0]],

        recentWorkingAreas: [{ value: "Ad Tech/Platform", parent: "Sales" }],
        //recentWorkingAreaParent: 'Sales',

        recentAreaExperience: MATCHING.EXPERIENCE.gt0lt2,
        recentAnnualIncome: MATCHING.RECENT_ANNUAL_INCOME.gt500,

        valueAssessments: [
            MATCHING.VALUE_ASSESSMENT.companyCulture, MATCHING.VALUE_ASSESSMENT.companyMission, MATCHING.VALUE_ASSESSMENT.competitive
        ],

        avatar: uploads['elon-avatar'],

        socialMedia: {
            linkedInUrl: 'https://www.linkedin.com/in/elon-musk',
            twitterAcc: '@elonmusk'
        },

        location: "New York, NY, United States",
        abilityToRelocate: true,
        workingExperience: [
            {
                companyName: 'SpaceX',
                position: 'CEO',
                location: 'New York, NY',
                duty: 'Worked Hard',
                startWorkingAt: '02/2003',
                isCurrentJob: true
            }
        ],
        employments: [MATCHING.EMPLOYMENT.FULL_TIME]
    }
]

var RECRUITERS = [
    {
        _id: RECRUITER_A_ID,
        user: USER_C_ID,
        company: COMPANY_A_ID,
        firstName: 'Rebecca',
        lastName: 'Ng',
        fullName: 'Rebecca Ng',
        position: 'Senior Recruiter',
        avatar: uploads['rebecca-avatar'],
        fullName: 'Rebecca Ng'
    }
    ,
    {
        _id: RECRUITER_B_ID,
        user: USER_D_ID,
        company: COMPANY_B_ID,
        firstName: 'Tyler',
        lastName: 'Perry',
        fullName: 'Tyler Perry',
        position: 'Senior Recruiter',
        avatar: uploads['tyler-avatar'],
    }
]
var COMPANIES = [
    {
        _id: COMPANY_A_ID,
        recruiters: [RECRUITER_A_ID],
        name: 'New York Times',
        foundDate: '1988',
        employeesAmount: MATCHING.EMPLOYEES_AMOUNT.gt200lt500,
        type: 'Traditional Publisher',

        headquartersLocation: "New York, NY, United States",

        valueAssessments: [
            MATCHING.VALUE_ASSESSMENT.companyCulture,
            MATCHING.VALUE_ASSESSMENT.companyMission,
            MATCHING.VALUE_ASSESSMENT.competitive
        ],

        socialMedia: {
            websiteUrl: 'http://website.com',
            linkedInUrl: 'http://website.com',
            twitterAcc: '@acc',
            facebookUrl: 'http://website.com'
        },

        locationOffices: [
            { location: 'Washington D.C. United States' },
            { location: 'Seattle, WA, United States' },
        ],

        isPremium: false,
        quoteOrMotto: "News is serious",
        description: "The New York Times (sometimes abbreviated NYT and The Times) is an American daily newspaper, founded and continuously published in New York City since September 18, 1851, by The New York Times Company. The New York Times has won 122 Pulitzer Prizes, more than any other newspaper.",
        logo: uploads['nyt-logo'],
        background: uploads['nyt-background'],
        images: [
            uploads['nyt-images-0'],
            uploads['nyt-images-1'],
            uploads['nyt-images-2'],
        ],
        registerAt: new Date(2017, 3, 15)
    },
    {
        _id: COMPANY_B_ID,
        recruiter: RECRUITER_B_ID,
        name: "Rosetta Software",
        foundDate: '2008',
        employeesAmount: MATCHING.EMPLOYEES_AMOUNT.lt10,
        type: 'Ad Tech',

        headquartersLocation: "Cleveland, OH, United States",

        valueAssessments: [
            MATCHING.VALUE_ASSESSMENT.companyCulture,
            MATCHING.VALUE_ASSESSMENT.companyMission,
            MATCHING.VALUE_ASSESSMENT.competitive
        ],

        socialMedia: {
            websiteUrl: 'http://website.com',
            linkedInUrl: 'http://website.com',
            twitterAcc: '@acc',
            facebookUrl: 'http://website.com'
        },

        isPremium: false,
        quoteOrMotto: "Work Hard/Play Hard",

        description: "In a Rosetta Stone Language Learning exercise, the student pairs sound or text to one of several images. The number of images per screen varies.\nFor example, the software shows the student four photographs. A native speaker makes a statement that describes one of the photographs, and the statement is printed on the screen; the student chooses the photograph that the speaker described. In another variation, the student completes a textual description of a photograph.\nIn writing exercises, the software provides an on-screen keyboard for the user to type characters that are not in the Latin alphabet.\nGrammar lessons cover grammatical tense and grammatical mood. In grammar lessons, the program firstly shows the learner several examples of a grammatical concept, and in some levels the word or words the learner should focus on are highlighted. Then the learner is given a sentence with several options for a word or phrase, and the student chooses the correct option.\nIf the student has a microphone, the software can attempt to evaluate word pronunciation.\nEach lesson concludes with a review of the content in that lesson, and each unit concludes with a milestone, which is a simulated conversation that includes the content of the unit.",

        logo: uploads['rosetta-logo'],
        background: uploads['rosetta-background'],
        images: [
            uploads['rosetta-images-0'],
            uploads['rosetta-images-1'],
            uploads['rosetta-images-2'],
            uploads['rosetta-images-3'],

        ],

        registerAt: new Date(2017, 3, 15)
    }
]
var VACANCIES = [
    {
        title: 'Sales',
        _company: COMPANY_A_ID,
        recruiter: RECRUITER_A_ID,
        industries: [{ parent: 'Sales', value: 'Ad Tech/Platform' }],
        salary: MATCHING.RECENT_ANNUAL_INCOME.gt100lt150,
        experience: MATCHING.EXPERIENCE.gt0lt2,
        employment: MATCHING.EMPLOYMENT.FULL_TIME,
        degree: MATCHING.DEGREE.UNDERGRADUATEDEGREE,
        location: "New York, NY, United States",
        status: MAIN.VACANCY_STATUS.OPENED,
        description: "JobPost A has an awesome description. Come work for a fast paced well-know news network",
        responsibilities: [
            "Coordinate background research on potential advertisering partners",
            "Source and coordinate leads for potential partners"
        ]
        ,
        requirements: [
            "Proficency in Microsoft Office, HubSpot, and multiple CRMs",
            "Ability to lead large teams"
        ],
    }
    ,
    {
        title: 'Sales',
        _company: COMPANY_B_ID,
        recruiter: RECRUITER_B_ID,
        industries: [{ parent: 'Sales', value: 'Ad Tech/Platform' }],
        salary: MATCHING.RECENT_ANNUAL_INCOME.gt400lt500,
        experience: MATCHING.EXPERIENCE.gt15,
        employment: MATCHING.EMPLOYMENT.FULL_TIME,
        location: "Cleveland, OH, United States",
        degree: MATCHING.DEGREE.GRADUATEDEGREE,
        status: MAIN.VACANCY_STATUS.OPENED,
        description: "Come work for a fast paced well-know news network",
        responsibilities: [
            "Coordinate background research on potential advertisering partners",
            "Source and coordinate leads for potential partners"
        ]
        ,
        requirements: [
            "Proficency in Microsoft Office, HubSpot, and multiple CRMs",
            "Ability to lead large teams"
        ],
        state: STATE.OH,
        createdAt: new Date('2018-07-28T16:41:08.647Z'),
    }
]

module.exports = { USERS, CANDIDATES, COMPANIES, VACANCIES, RECRUITERS }
