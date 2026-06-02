import { useId } from 'react';
import styles from './HeroDashboard.module.css';

const sparkPath =
	'M0,10 L3,8 L6,11 L9,6 L12,9 L15,4 L18,7 L21,3 L24,6 L27,2 L30,5 L33,1 L36,4';

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
				<rect x="2" y="10" width="3" height="4" rx="0.5" opacity="0.45" />
				<rect x="6.5" y="6" width="3" height="8" rx="0.5" opacity="0.45" />
				<rect x="11" y="3" width="3" height="11" rx="0.5" opacity="0.45" />
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
}: {
	label: string;
	value: string;
	delta: string;
}) {
	return (
		<div className={styles.stat}>
			<p className={styles.statLabel}>{label}</p>
			<p className={styles.statValue}>{value}</p>
			<p className={styles.statDelta}>
				<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
					<path d="M5 2l3 4H6v3H4V6H2l3-4z" />
				</svg>
				{delta}
			</p>
			<svg className={styles.spark} viewBox="0 0 36 14" preserveAspectRatio="none" aria-hidden>
				<path d={sparkPath} fill="none" stroke="#0055ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
			</svg>
		</div>
	);
}

export default function HeroDashboard() {
	const gid = useId().replace(/:/g, '');
	const gradId = `heroDashGrad-${gid}`;

	return (
		<div className={styles.stage}>
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
							<StatCard label="Total Users" value="2,543" delta="+15.5%" />
							<StatCard label="Revenue" value="$28,540" delta="+8.2%" />
							<StatCard label="Orders" value="320" delta="+15.3%" />
						</div>
						<div className={styles.chartsRow}>
							<div className={styles.chartCard}>
								<h3 className={styles.chartTitle}>Performance Overview</h3>
								<div className={styles.lineWrap}>
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
											fill={`url(#${gradId})`}
											stroke="none"
											points="32,88 72,78 112,82 152,52 192,48 232,28 272,18 308,12 308,104 32,104"
										/>
										<polyline
											fill="none"
											stroke="#0055ff"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round"
											points="32,88 72,78 112,82 152,52 192,48 232,28 272,18 308,12"
										/>
										{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
											<text
												key={m}
												x={32 + i * 52}
												y="116"
												fill="#6b7280"
												fontSize="9"
												fontWeight="600"
												textAnchor="middle"
											>
												{m}
											</text>
										))}
									</svg>
								</div>
							</div>
							<div className={styles.chartCard}>
								<h3 className={styles.chartTitle}>Traffic Source</h3>
								<div className={styles.donutRow}>
									<div className={styles.donut} aria-hidden>
										<div className={styles.donutHole} />
									</div>
									<div className={styles.legend}>
										{(
											[
												['Direct', '#0055ff'],
												['Referral', '#94a3b8'],
												['Organic', '#cbd5e1'],
												['Social', '#e2e8f0'],
											] as const
										).map(([label, color]) => (
											<div key={label} className={styles.legendItem}>
												<span className={styles.dot} style={{ background: color }} />
												<span>{label}</span>
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
