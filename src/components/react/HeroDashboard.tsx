import { useEffect, useId, useState, type CSSProperties } from 'react';
import styles from './HeroDashboard.module.css';

const sparkPath =
	'M0,10 L3,8 L6,11 L9,6 L12,9 L15,4 L18,7 L21,3 L24,6 L27,2 L30,5 L33,1 L36,4';

const LINE_POINTS = '32,88 72,78 112,82 152,52 192,48 232,28 272,18 308,12';
const LINE_AREA_POINTS = `${LINE_POINTS} 308,104 32,104`;

const TRAFFIC_SEGMENTS = [
	{ label: 'Direct', color: '#0055ff', share: 0.35 },
	{ label: 'Referral', color: '#94a3b8', share: 0.25 },
	{ label: 'Organic', color: '#cbd5e1', share: 0.2 },
	{ label: 'Social', color: '#e2e8f0', share: 0.2 },
] as const;

function usePrefersReducedMotion(): boolean {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => setReduced(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);

	return reduced;
}

function pieSlicePath(cx: number, cy: number, r: number, start: number, end: number): string {
	const startAngle = start * Math.PI * 2 - Math.PI / 2;
	const endAngle = end * Math.PI * 2 - Math.PI / 2;
	const x1 = cx + r * Math.cos(startAngle);
	const y1 = cy + r * Math.sin(startAngle);
	const x2 = cx + r * Math.cos(endAngle);
	const y2 = cy + r * Math.sin(endAngle);
	const large = end - start > 0.5 ? 1 : 0;
	return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

function IconGrid({ active }: { active?: boolean }) {
	return (
		<div className={active ? `${styles.navBtn} ${styles.navBtnActive}` : styles.navBtn} aria-hidden>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
				<path d="M2 2h4v4H2V2zm8 0h4v4h-4V2zM2 10h4v4H2v-4zm8 0h4v4h-4v-4z" opacity={active ? 1 : 0.55} />
			</svg>
		</div>
	);
}

function IconUser() {
	return (
		<div className={styles.navBtn} aria-hidden>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
				<circle cx="8" cy="5" r="2.5" />
				<path d="M3 14c0-2.5 2.2-4 5-4s5 1.5 5 4" strokeLinecap="round" />
			</svg>
		</div>
	);
}

function IconDoc() {
	return (
		<div className={styles.navBtn} aria-hidden>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
				<path d="M4 2h6l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
				<path d="M9 2v3h3" />
			</svg>
		</div>
	);
}

function IconChat() {
	return (
		<div className={styles.navBtn} aria-hidden>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
				<path d="M3 12V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H7l-3 2v-2H4a1 1 0 0 1-1-1z" />
			</svg>
		</div>
	);
}

function IconPie() {
	return (
		<div className={styles.navBtn} aria-hidden>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
				<path d="M8 2v6h6A6 6 0 0 0 8 2z" />
				<path d="M8 8L2.5 8A6 6 0 0 0 14 8.5" />
			</svg>
		</div>
	);
}

function IconBar() {
	return (
		<div className={styles.navBtn} aria-hidden>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
				<rect className={styles.navBar1} x="2" y="10" width="3" height="4" rx="0.5" />
				<rect className={styles.navBar2} x="6.5" y="6" width="3" height="8" rx="0.5" />
				<rect className={styles.navBar3} x="11" y="3" width="3" height="11" rx="0.5" />
			</svg>
		</div>
	);
}

function IconGear() {
	return (
		<div className={styles.navBtn} aria-hidden>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
				<circle cx="8" cy="8" r="2.2" />
				<path d="M8 1v2M8 13v2M15 8h-2M3 8H1M13.2 2.8l-1.4 1.4M4.2 11.8l-1.4 1.4M13.2 13.2l-1.4-1.4M4.2 4.2L2.8 2.8" strokeLinecap="round" />
			</svg>
		</div>
	);
}

function StatCard({
	label,
	value,
	delta,
	index,
	alive,
}: {
	label: string;
	value: string;
	delta: string;
	index: number;
	alive: boolean;
}) {
	return (
		<div
			className={styles.stat}
			style={{ '--stat-i': index } as CSSProperties}
			data-alive={alive ? '' : undefined}
		>
			<p className={styles.statLabel}>{label}</p>
			<p className={styles.statValue}>{value}</p>
			<p className={styles.statDelta}>
				<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
					<path d="M5 2l3 4H6v3H4V6H2l3-4z" />
				</svg>
				{delta}
			</p>
			<svg className={styles.spark} viewBox="0 0 36 14" preserveAspectRatio="none" aria-hidden>
				<path
					className={styles.sparkPath}
					d={sparkPath}
					fill="none"
					stroke="#0055ff"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
}

function TrafficDonut({ highlightIndex, alive }: { highlightIndex: number; alive: boolean }) {
	let cursor = 0;
	const slices = TRAFFIC_SEGMENTS.map((seg, i) => {
		const start = cursor;
		cursor += seg.share;
		return { ...seg, start, end: cursor, index: i };
	});

	return (
		<div className={styles.donutWrap} data-alive={alive ? '' : undefined}>
			<svg className={styles.donutSvg} viewBox="0 0 100 100" aria-hidden>
				{slices.map((slice) => (
					<path
						key={slice.label}
						d={pieSlicePath(50, 50, 42, slice.start, slice.end)}
						fill={slice.color}
						className={
							highlightIndex === slice.index
								? `${styles.donutSlice} ${styles.donutSliceActive}`
								: styles.donutSlice
						}
					/>
				))}
				<circle className={styles.donutCenter} cx="50" cy="50" r="26" />
			</svg>
		</div>
	);
}

function PerformanceChart({ gradId, alive }: { gradId: string; alive: boolean }) {
	return (
		<div className={styles.lineWrap} data-alive={alive ? '' : undefined}>
			<svg className={styles.lineSvg} viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet">
				<defs>
					<linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#0055ff" stopOpacity="0.2" />
						<stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
					</linearGradient>
				</defs>
				<line x1="32" y1="8" x2="32" y2="104" stroke="#e5e7eb" strokeWidth="1" />
				<line x1="32" y1="104" x2="308" y2="104" stroke="#e5e7eb" strokeWidth="1" />
				<polyline
					className={styles.lineArea}
					fill={`url(#${gradId})`}
					stroke="none"
					points={LINE_AREA_POINTS}
				/>
				<polyline
					className={styles.linePath}
					fill="none"
					stroke="#0055ff"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					points={LINE_POINTS}
				/>
				<circle className={styles.lineDot} cx="308" cy="12" r="4" fill="#0055ff" />
				<circle className={styles.lineDotRing} cx="308" cy="12" r="7" fill="none" stroke="#0055ff" strokeWidth="1.5" />
				{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
					<text
						key={m}
						className={styles.lineLabel}
						x={32 + i * 52}
						y="116"
						fill="#6b7280"
						fontSize="9"
						fontWeight="600"
						textAnchor="middle"
						style={{ '--month-i': i } as CSSProperties}
					>
						{m}
					</text>
				))}
			</svg>
		</div>
	);
}

export default function HeroDashboard() {
	const gid = useId().replace(/:/g, '');
	const gradId = `heroDashGrad-${gid}`;
	const reducedMotion = usePrefersReducedMotion();
	const alive = !reducedMotion;
	const [highlightIndex, setHighlightIndex] = useState(0);

	useEffect(() => {
		if (reducedMotion) return;
		const id = window.setInterval(() => {
			setHighlightIndex((i) => (i + 1) % TRAFFIC_SEGMENTS.length);
		}, 2800);
		return () => window.clearInterval(id);
	}, [reducedMotion]);

	return (
		<div className={`${styles.stage} ${alive ? styles.stageAlive : ''}`}>
			<div className={styles.root} role="img" aria-label="Sample analytics dashboard preview">
				<div className={styles.shell}>
					<aside className={styles.sidebar}>
						<IconGrid active />
						<IconUser />
						<IconDoc />
						<IconChat />
						<IconPie />
						<IconBar />
						<IconGear />
					</aside>
					<div className={styles.main}>
						<h2 className={styles.dashTitle}>Dashboard</h2>
						<div className={styles.stats}>
							<StatCard label="Total Users" value="2,543" delta="+15.5%" index={0} alive={alive} />
							<StatCard label="Revenue" value="$28,540" delta="+8.2%" index={1} alive={alive} />
							<StatCard label="Orders" value="320" delta="+15.3%" index={2} alive={alive} />
						</div>
						<div className={styles.chartsRow}>
							<div className={styles.chartCard} data-alive={alive ? '' : undefined}>
								<h3 className={styles.chartTitle}>Performance Overview</h3>
								<PerformanceChart gradId={gradId} alive={alive} />
							</div>
							<div className={styles.chartCard} data-alive={alive ? '' : undefined}>
								<h3 className={styles.chartTitle}>Traffic Source</h3>
								<div className={styles.donutRow}>
									<TrafficDonut highlightIndex={highlightIndex} alive={alive} />
									<div className={styles.legend}>
										{TRAFFIC_SEGMENTS.map((seg, i) => (
											<div
												key={seg.label}
												className={
													highlightIndex === i
														? `${styles.legendItem} ${styles.legendItemActive}`
														: styles.legendItem
												}
											>
												<span className={styles.dot} style={{ background: seg.color }} />
												<span>{seg.label}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
