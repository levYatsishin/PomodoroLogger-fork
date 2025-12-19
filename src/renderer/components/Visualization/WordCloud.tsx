import * as React from 'react';
// @ts-ignore
import WordCloud2 from 'wordcloud';
import { PomodoroRecord } from '../../monitor/type';
import { workers } from '../../workers';
import { Loading } from '../utils/Loading';
import { Card } from '../Kanban/type';
import { ThemeName } from '../../style/theme';

const tokenizer = workers.tokenizer;

interface Props {
    weights: [string, number][];
    themeName?: ThemeName;
}

type MProps = Props & { [other: string]: any };
export const WordCloud: React.FC<MProps> = (props: MProps) => {
    const canvas = React.useRef<HTMLCanvasElement>();
    const { weights, themeName, ...restProps } = props;
    React.useEffect(() => {
        if (canvas.current === undefined || props.weights.length === 0) {
            return;
        }

        const canvasEl = canvas.current;
        const width = props.width || canvasEl.clientWidth || 800;
        const height = props.height || canvasEl.clientHeight || Math.floor(width * 0.6);
        canvasEl.width = width;
        canvasEl.height = height;
        const cssBg = getComputedStyle(document.documentElement)
            .getPropertyValue('--pl-card-bg')
            .trim();
        const backgroundColor =
            cssBg && cssBg.length > 0 ? cssBg : themeName === 'dark' ? '#282828' : '#ffffff';
        const ctx = canvasEl.getContext('2d');
        if (ctx) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
        }
        canvasEl.style.background = backgroundColor;
        WordCloud2(canvasEl, {
            backgroundColor,
            list: weights,
            gridSize: Math.round((8 * width) / 800),
            weightFactor: (size: number) => {
                return (Math.pow(size, 1.1) * width) / 800;
            },
            fontFamily: 'Times, serif',
            color: (word: string, weight: number) => {
                return weight >= 38 ? '#f02222' : '#c09292';
            },
            rotateRatio: 0.5,
            rotationSteps: 2,
        });
    }, [weights, themeName, props.width, props.height]);

    // @ts-ignore
    return <canvas ref={canvas} {...restProps} />;
};

interface AsyncProps {
    records: PomodoroRecord[];
    cards?: Card[];
    themeName?: ThemeName;
}

type MAsyncProps = AsyncProps & { [name: string]: any };
export const AsyncWordCloud: React.FC<MAsyncProps> = (props: MAsyncProps) => {
    const { records, cards = [], ...restProps } = props;
    const [weights, setWeights] = React.useState<[string, number][]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        tokenizer.tokenize(records, cards).then((weights) => {
            setWeights(weights);
            setIsLoading(false);
        });
    }, [records]);
    return isLoading ? (
        <Loading size={'large'} height={400} />
    ) : (
        <WordCloud weights={weights} {...restProps} />
    );
};
