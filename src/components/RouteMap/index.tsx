import React, {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import * as modelRu from './model';
import * as modelEn from './model.en';
import type {Answers, Explained, Question} from './model';
import styles from './styles.module.css';

// Вопросы, правила и подписи — на языке текущей версии сайта.
const models = {ru: modelRu, en: modelEn};

const ui = {
  ru: {
    catalogType: 'Тип каталога',
    more: 'Подробнее',
    delivery: 'Как создавать',
    alsoConsider: 'Стоит рассмотреть и',
    platforms: 'С каких платформ начать сравнение',
    capabilities: 'Выбранные возможности: ядро или расширение',
    standards: 'Стандарты метаданных',
    warnings: 'На что обратить внимание',
    readNext: 'Что прочитать дальше',
    yourAnswers: 'Ваши ответы',
    recommendation: 'Рекомендация',
    step: (n: number, total: number) => `Шаг ${n} из ${total}`,
    back: 'Назад',
    next: 'Далее',
    restart: 'Начать заново',
  },
  en: {
    catalogType: 'Catalog type',
    more: 'More',
    delivery: 'How to build it',
    alsoConsider: 'Also worth considering',
    platforms: 'Platforms to start comparing',
    capabilities: 'Selected capabilities: core or extension',
    standards: 'Metadata standards',
    warnings: 'Things to watch',
    readNext: 'What to read next',
    yourAnswers: 'Your answers',
    recommendation: 'Recommendation',
    step: (n: number, total: number) => `Step ${n} of ${total}`,
    back: 'Back',
    next: 'Next',
    restart: 'Start over',
  },
};

type Lang = keyof typeof models;

function useLang(): Lang {
  const {currentLocale} = useDocusaurusContext().i18n;
  return currentLocale === 'en' ? 'en' : 'ru';
}

function OptionList({
  question,
  selected,
  onToggle,
}: {
  question: Question;
  selected: string[];
  onToggle: (optionId: string) => void;
}): ReactNode {
  return (
    <div className={styles.options} role={question.multiple ? 'group' : 'radiogroup'}>
      {question.options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            role={question.multiple ? 'checkbox' : 'radio'}
            aria-checked={isSelected}
            className={clsx(styles.option, isSelected && styles.optionSelected)}
            onClick={() => onToggle(option.id)}>
            <span className={styles.marker} aria-hidden="true">
              {question.multiple ? (isSelected ? '☑' : '☐') : isSelected ? '●' : '○'}
            </span>
            <span>
              <span className={styles.optionLabel}>{option.label}</span>
              {option.hint && <span className={styles.optionHint}>{option.hint}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AnswerSummary({answers}: {answers: Answers}): ReactNode {
  const {questions} = models[useLang()];
  return (
    <ul className={styles.summary}>
      {questions.map((question) => {
        const labels = (answers[question.id] ?? [])
          .map((id) => question.options.find((option) => option.id === id)?.label)
          .filter(Boolean);
        return (
          <li key={question.id}>
            <span className={styles.summaryQuestion}>{question.title}</span> {labels.join('; ')}
          </li>
        );
      })}
    </ul>
  );
}

function ExplainedList({items}: {items: Explained[]}): ReactNode {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.text}>
          {item.text}
          <span className={styles.optionHint}>{item.why}</span>
        </li>
      ))}
    </ul>
  );
}

function Result({answers}: {answers: Answers}): ReactNode {
  const lang = useLang();
  const t = ui[lang];
  const result = models[lang].recommend(answers);
  return (
    <div className={styles.result}>
      <h3>
        {t.catalogType}: {result.catalogType}
      </h3>
      <p>
        {t.more}:{' '}
        {result.typeChapters.map((chapter, i) => (
          <React.Fragment key={chapter.to}>
            {i > 0 && ', '}
            <Link to={chapter.to}>{chapter.label}</Link>
          </React.Fragment>
        ))}
        .
      </p>

      <h4>
        {t.delivery}: {result.delivery}
      </h4>
      <p>{result.deliveryWhy}</p>
      {result.alternatives.length > 0 && (
        <p className={styles.muted}>
          {t.alsoConsider}: {result.alternatives.join('; ')}.
        </p>
      )}

      <h4>{t.platforms}</h4>
      <ExplainedList items={result.platforms} />

      {result.capabilityNotes.length > 0 && (
        <>
          <h4>{t.capabilities}</h4>
          <ExplainedList items={result.capabilityNotes} />
        </>
      )}

      <h4>{t.standards}</h4>
      <ExplainedList items={result.standards} />

      <h4>{result.interfacesTitle}</h4>
      <ExplainedList items={result.interfaces} />

      {result.warnings.length > 0 && (
        <div className="alert alert--warning" role="note">
          <strong>{t.warnings}</strong>
          <ul className={styles.warnings}>
            {result.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <h4>{t.readNext}</h4>
      <ul>
        {result.readNext.map((chapter) => (
          <li key={chapter.to}>
            <Link to={chapter.to}>{chapter.label}</Link>
          </li>
        ))}
      </ul>

      <details className={styles.details}>
        <summary>{t.yourAnswers}</summary>
        <AnswerSummary answers={answers} />
      </details>
    </div>
  );
}

export default function RouteMap(): ReactNode {
  const t = ui[useLang()];
  const {questions} = models[useLang()];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const finished = step >= questions.length;
  const question = questions[Math.min(step, questions.length - 1)];
  const selected = answers[question.id] ?? [];

  const toggle = (optionId: string) => {
    if (!question.multiple) {
      setAnswers({...answers, [question.id]: [optionId]});
      setStep(step + 1);
      return;
    }
    let next: string[];
    if (selected.includes(optionId)) {
      next = selected.filter((id) => id !== optionId);
    } else if (optionId === question.exclusive) {
      next = [optionId];
    } else {
      next = [...selected.filter((id) => id !== question.exclusive), optionId];
    }
    setAnswers({...answers, [question.id]: next});
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className={styles.routeMap}>
      <div className={styles.header}>
        <span className={styles.progress}>
          {finished ? t.recommendation : t.step(step + 1, questions.length)}
        </span>
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={Math.min(step, questions.length)}>
          <div
            className={styles.progressFill}
            style={{width: `${(Math.min(step, questions.length) / questions.length) * 100}%`}}
          />
        </div>
      </div>

      {finished ? (
        <Result answers={answers} />
      ) : (
        <>
          <h3 className={styles.question}>{question.title}</h3>
          {question.help && <p className={styles.muted}>{question.help}</p>}
          <OptionList question={question} selected={selected} onToggle={toggle} />
        </>
      )}

      <div className={styles.nav}>
        <button
          type="button"
          className="button button--secondary"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}>
          {t.back}
        </button>
        {!finished && question.multiple && (
          <button
            type="button"
            className="button button--primary"
            disabled={selected.length === 0}
            onClick={() => setStep(step + 1)}>
            {t.next}
          </button>
        )}
        {(finished || step > 0) && (
          <button type="button" className="button button--link" onClick={restart}>
            {t.restart}
          </button>
        )}
      </div>
    </div>
  );
}
