import { Moment } from 'moment';

import { FORMAT_Y_M_D, formatDate } from '../../src/utils/format-date';

const exercises = {
    name: 'Скручивание',
    isImplementation: false,
    replays: 1,
    weight: 10,
    approaches: 3,
};

const dateTrainingOne = '2024-02-07T20:27:56.843Z';
const dateTrainingTwo = '2024-02-01T20:27:56.843Z';
const dateTrainingThree = '2024-03-01T20:27:56.843Z';

export const trainingMock = {
    [formatDate(dateTrainingOne as unknown as Moment, FORMAT_Y_M_D)]: [
        {
            name: 'Силовая',
            date: dateTrainingOne,
            exercises: [exercises, exercises, exercises],
        },
        {
            name: 'Ноги',
            date: dateTrainingOne,
            exercises: [exercises, exercises, exercises],
        },
        {
            name: 'Грудь',
            date: dateTrainingOne,
            exercises: [exercises, exercises, exercises, exercises, exercises, exercises],
        },
    ],

    [formatDate(dateTrainingTwo as unknown as Moment, FORMAT_Y_M_D)]: [
        {
            name: 'Силовая',
            date: dateTrainingTwo,
            exercises: [exercises, exercises, exercises],
        },
        {
            name: 'Ноги',
            date: dateTrainingTwo,
            exercises: [exercises, exercises, exercises],
        },
        {
            name: 'Грудь',
            date: dateTrainingTwo,
            exercises: [exercises, exercises, exercises, exercises, exercises, exercises],
        },
    ],

    [formatDate(dateTrainingThree as unknown as Moment, FORMAT_Y_M_D)]: [
        {
            name: 'Силовая',
            date: dateTrainingThree,
            exercises: [exercises, exercises, exercises],
        },
        {
            name: 'Ноги',
            date: dateTrainingThree,
            exercises: [exercises, exercises, exercises],
        },
        {
            name: 'Грудь',
            date: dateTrainingThree,
            exercises: [exercises, exercises, exercises, exercises, exercises, exercises],
        },
    ],
};
