/* eslint-disable react/no-array-index-key */
import { FC, ReactNode, useEffect, useState } from 'react';
import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BadgeChanged } from '@components/badge-changed/badge-changed.tsx';
import { DrawerRight } from '@components/drawer-right';
import { ExercisesForm } from '@components/exercises-form/exercises-form.tsx';
import { ModalNotification } from '@components/modal-notification';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { leftMenuSelector, setStateLeftMenu } from '@redux/modules/app.ts';
import {
    addDefaultTraining,
    addExercises,
    deleteExercises,
    resetTraining,
    setExercisesData,
    setExercisesNotEmpty,
    setStateCardModal,
    setTrainingData,
    trainingsSelector,
} from '@redux/modules/training.ts';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from '@redux/serviсes/training.ts';
import { UserTraining } from '@redux/types/training.ts';
import { findUserTraining } from '@utils/find-user-training.ts';
import { FORMAT_Y_M_D, formatDate, isOldDate } from '@utils/format-date.ts';
import { Button, Typography } from 'antd';
import moment, { Moment } from 'moment';

import { CardModalBody, ChangeType } from '../../../constans/card-modal.ts';

import { CardExercises } from './card-exercises/card-exercises.tsx';
import { TrainingDataCall } from './types/card-modal.ts';
import { CardTraining } from './card-training';

import styles from './card-modal.module.css';
import Nullable = Cypress.Nullable;

type CardModalWrapper = {
    offsetTop: number;
    trainings: UserTraining[];
    date: Moment;
    onClose: () => void;
    isLeft: boolean;
};

const titleDrawer: Record<ChangeType, string> = {
    [ChangeType.ADD_NEW]: 'Добавление упражнений',
    [ChangeType.EDIT_OLD]: 'Редактирование',
    [ChangeType.EDIT_FUTURE]: 'Редактирование',
};

const iconDrawer: Record<ChangeType, ReactNode> = {
    [ChangeType.ADD_NEW]: <PlusOutlined />,
    [ChangeType.EDIT_OLD]: <EditOutlined />,
    [ChangeType.EDIT_FUTURE]: <EditOutlined />,
};

export const CardModal: FC<CardModalWrapper> = ({
    isLeft,
    onClose,
    trainings = [],
    date,
    offsetTop,
}) => {
    const [selectTraining, setSelectTraining] = useState('');
    const [indexes, setIndexes] = useState<number[]>([]);
    const [openModalError, setOpenModalError] = useState(false);
    const dispatch = useAppDispatch();
    const openMenu = useAppSelector(leftMenuSelector);
    const {
        defaultTrainings,
        cardModalState,
        typeEdit,
        createdTraining: { exercises, date: dataCreated, name, id },
        userTraining,
    } = useAppSelector(trainingsSelector);

    const [createTraining, { isLoading: isLoadingCreate, isError: isErrorCreate }] =
        useCreateTrainingMutation();
    const [updateTraining, { isLoading: isLoadingUpdate, isError: isErrorUpdate }] =
        useUpdateTrainingMutation();

    useEffect(() => {
        if (isErrorCreate || isErrorUpdate) {
            setOpenModalError(true);
        }
    }, [isErrorCreate, isErrorUpdate]);

    const onNextState = (data: TrainingDataCall) => {
        const dateFormat = formatDate(data.date, FORMAT_Y_M_D);

        dispatch(resetTraining());
        dispatch(setStateCardModal(data.openFlag));
        setSelectTraining(data?.name || '');
        dispatch(
            setTrainingData({
                ...findUserTraining(userTraining, dateFormat, data?.name),
                date: dateFormat,
                name: data?.name,
            }),
        );
    };

    const onOpenMenu = (date: string | Moment) => {
        dispatch(setStateLeftMenu());
        dispatch(setTrainingData({ date: formatDate(date, FORMAT_Y_M_D) }));
        if (!exercises.length) {
            dispatch(addDefaultTraining());
        }
    };

    const onCloseDrawer = () => {
        dispatch(setStateLeftMenu());
        dispatch(setExercisesNotEmpty(exercises.filter(({ name }) => Boolean(name))));
    };

    const onSelectedTraining = (value: string, date: string | Moment) => {
        const valueFormatDate = formatDate(date, FORMAT_Y_M_D);

        dispatch(
            setTrainingData({
                date: valueFormatDate,
                name: value,
                exercises:
                    userTraining[valueFormatDate]?.filter(({ name }) => name === value)?.[0]
                        ?.exercises || [],
            }),
        );

        setSelectTraining(value);
    };

    const onSetIndex = (index: number) => {
        if (indexes.includes(index)) {
            setIndexes(indexes.filter((element) => element !== index));

            return;
        }

        setIndexes([...indexes, index]);
    };

    const onChangeApproaches = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ approaches: value || 0, index }));
    };

    const onChangeName = (value: Nullable<string>, index: number) => {
        dispatch(setExercisesData({ name: value || '', index }));
    };

    const onChangeReplays = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ replays: value || 0, index }));
    };

    const onChangeWeight = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ weight: value || 0, index }));
    };

    const addExercisesDataHandle = () => {
        dispatch(addExercises());
    };

    const deleteExercisesDataHandle = () => {
        dispatch(deleteExercises(indexes));
        setIndexes([]);
    };

    const onClickButtonError = () => {
        setOpenModalError(false);
        dispatch(setStateCardModal());
    };

    const onSaveTraining = () => {
        const body = {
            isImplementation: isOldDate(dataCreated),
            id,
            name,
            exercises,
            date: `${dataCreated}T00:00:00.000Z`,
        };

        console.log(JSON.stringify(body), 'body');
        if (typeEdit !== ChangeType.ADD_NEW && id) {
            updateTraining(body);

            return;
        }

        createTraining(body);
    };

    console.log('typeEdit', typeEdit);
    console.log('!exercises.length', !exercises.length);
    console.log(
        '!exercises.length && typeEdit === ChangeType.ADD_NEW',
        !exercises.length && typeEdit === ChangeType.ADD_NEW,
    );
    const ComponentToRender: Record<CardModalBody, ReactNode> = {
        [CardModalBody.TRAINING]: (
            <CardTraining
                disabledButton={defaultTrainings.length === trainings.length || isOldDate(date)}
                isTraining={Boolean(trainings.length)}
                trainings={trainings}
                date={date}
                onNextOpen={onNextState}
                openFlag={CardModalBody.EXERCISES}
                onClose={onClose}
            />
        ),
        [CardModalBody.EXERCISES]: (
            <CardExercises
                textButtonCancel={isOldDate(date) ? 'Сохранить изменения' : 'Сохранить'}
                isLoading={isLoadingCreate || isLoadingUpdate}
                defaultsTrainings={defaultTrainings}
                selectedTraining={selectTraining}
                trainings={trainings}
                exercises={exercises}
                onAddButton={onOpenMenu}
                onSaveButton={onSaveTraining}
                disabledSave={!exercises.length && typeEdit === ChangeType.ADD_NEW}
                date={date}
                onNextOpen={onNextState}
                openFlag={CardModalBody.TRAINING}
                onSelectedTraining={onSelectedTraining}
            />
        ),
    };

    const classWrapper = offsetTop
        ? styles.cardModalMobile
        : `${isLeft ? styles.cardModalLeft : styles.cardModalRight}`;

    return (
        <div style={{ top: offsetTop }} className={`${styles.cardModalWrapper} ${classWrapper}`}>
            {ComponentToRender[cardModalState || CardModalBody.TRAINING]}
            <DrawerRight
                open={openMenu}
                onClose={onCloseDrawer}
                title={titleDrawer[typeEdit]}
                iconClose={iconDrawer[typeEdit]}
            >
                <div>
                    <div className={styles.titleDate}>
                        <BadgeChanged
                            isStatus={true}
                            isEdit={false}
                            text={name}
                            date={moment(dataCreated)}
                        />
                        <Typography.Text type='secondary'>
                            {formatDate(dataCreated)}
                        </Typography.Text>
                    </div>

                    {exercises.map(({ weight, approaches, name, replays }, index) => (
                        <ExercisesForm
                            key={index}
                            weight={weight}
                            approaches={approaches}
                            name={name}
                            replays={replays}
                            onChangeApproaches={onChangeApproaches}
                            onChangeName={onChangeName}
                            onChangeReplays={onChangeReplays}
                            onChangeWeight={onChangeWeight}
                            index={index}
                            indexes={indexes}
                            onCheckedElement={onSetIndex}
                            isCheck={typeEdit !== ChangeType.ADD_NEW}
                        />
                    ))}

                    <div className={styles.buttonWrapper}>
                        <Button
                            type='text'
                            icon={<PlusOutlined />}
                            size='small'
                            ghost={true}
                            onClick={addExercisesDataHandle}
                        >
                            Добавить ещё
                        </Button>
                        {typeEdit !== ChangeType.ADD_NEW && (
                            <Button
                                type='text'
                                icon={<MinusOutlined />}
                                size='small'
                                ghost={true}
                                disabled={!indexes.length}
                                onClick={deleteExercisesDataHandle}
                            >
                                Удалить
                            </Button>
                        )}
                    </div>
                </div>
            </DrawerRight>

            <ModalNotification
                textButton='Закрыть'
                onClickButton={onClickButtonError}
                type='error'
                isCloseIcon={false}
                title='При сохранении данных произошла ошибка'
                subtitle='Придётся попробовать ещё раз'
                open={openModalError}
            />
        </div>
    );
};
