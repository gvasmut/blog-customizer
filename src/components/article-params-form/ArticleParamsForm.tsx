import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';

import { clsx } from 'clsx';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setFormIsOpen] = useState(false);
	const [formParams, setFormParams] = useState(articleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: rootRef,
		onChange: setFormIsOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setFormIsOpen((prev) => !prev);
				}}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setArticleState(formParams);
						setFormIsOpen(false);
					}}
					onReset={() => {
						setFormParams(defaultArticleState);
						setArticleState(defaultArticleState);
					}}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						selected={formParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(params) =>
							setFormParams({ ...formParams, fontFamilyOption: params })
						}></Select>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={formParams.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(params) =>
							setFormParams({ ...formParams, fontSizeOption: params })
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={formParams.fontColor}
						options={fontColors}
						onChange={(params) =>
							setFormParams({ ...formParams, fontColor: params })
						}></Select>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formParams.backgroundColor}
						options={backgroundColors}
						onChange={(params) =>
							setFormParams({ ...formParams, backgroundColor: params })
						}></Select>
					<Select
						title='Ширина контента'
						selected={formParams.contentWidth}
						options={contentWidthArr}
						onChange={(params) =>
							setFormParams({ ...formParams, contentWidth: params })
						}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
