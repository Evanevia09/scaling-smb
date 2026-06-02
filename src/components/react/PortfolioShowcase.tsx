import { useCallback, useEffect, useState } from 'react';
import styles from './PortfolioShowcase.module.css';

export type PortfolioHighlightIcon = 'web' | 'mobile' | 'search' | 'cart' | 'leads' | 'brand';

export type PortfolioSlide = {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	imageAlt: string;
	highlights: ReadonlyArray<{ icon: PortfolioHighlightIcon; label: string }>;
};

type Props = {
	eyebrow: string;
	projects: PortfolioSlide[];
};

function HighlightIcon({ icon }: { icon: PortfolioHighlightIcon }) {
	switch (icon) {
		case 'mobile':
			return (
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
					<rect x="7" y="2" width="10" height="20" rx="2" />
					<path d="M11 18h2" strokeLinecap="round" />
				</svg>
			);
		case 'search':
			return (
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
					<circle cx="11" cy="11" r="6" />
					<path d="M16 16l5 5" strokeLinecap="round" />
				</svg>
			);
		case 'cart':
			return (
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
					<path d="M6 6h15l-1.5 9h-12L5 3H2" strokeLinecap="round" strokeLinejoin="round" />
					<circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
					<circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
				</svg>
			);
		case 'leads':
			return (
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
					<path d="M4 6h16v12H4z" />
					<path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			);
		case 'brand':
			return (
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
					<path d="M12 3l8 4v10l-8 4-8-4V7l8-4z" strokeLinejoin="round" />
				</svg>
			);
		default:
			return (
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
					<circle cx="12" cy="12" r="9" />
					<path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
				</svg>
			);
	}
}

export default function PortfolioShowcase({ eyebrow, projects }: Props) {
	const count = projects.length;
	const [active, setActive] = useState(0);

	const goTo = useCallback(
		(index: number) => {
			if (count === 0) return;
			setActive(((index % count) + count) % count);
		},
		[count],
	);

	const goPrev = useCallback(() => goTo(active - 1), [goTo, active]);
	const goNext = useCallback(() => goTo(active + 1), [goTo, active]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				goPrev();
			}
			if (e.key === 'ArrowRight') {
				e.preventDefault();
				goNext();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [goPrev, goNext]);

	if (count === 0) return null;

	const current = projects[active];

	return (
		<div
			className={styles.root}
			role="region"
			aria-roledescription="carousel"
			aria-label="Portfolio projects"
			onWheel={(e) => e.stopPropagation()}
		>
			<div className={styles.copy} aria-live="polite">
				<p className={styles.eyebrow}>{eyebrow}</p>
				<p className={styles.category}>{current.category}</p>
				<h2 id="portfolio-active-title" className={styles.title}>
					{current.title}
				</h2>
				<p className={styles.description}>{current.description}</p>
				<ul className={styles.highlights}>
					{current.highlights.map((item) => (
						<li key={item.label} className={styles.highlight}>
							<span className={styles.highlightIcon}>
								<HighlightIcon icon={item.icon} />
							</span>
							<span className={styles.highlightLabel}>{item.label}</span>
						</li>
					))}
				</ul>
			</div>

			<div className={styles.visual}>
				<div
					key={current.id}
					className={styles.image}
					role="img"
					aria-label={current.imageAlt}
					style={{ backgroundImage: `url("${current.image}")` }}
				/>

				<div className={styles.nav}>
					<button type="button" className={styles.navBtn} onClick={goPrev} aria-label="Previous project">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
							<path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>

					<div className={styles.dots} role="tablist" aria-label="Choose project">
						{projects.map((project, i) => (
							<button
								key={project.id}
								type="button"
								className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
								role="tab"
								aria-selected={i === active}
								aria-label={project.title}
								onClick={() => goTo(i)}
							/>
						))}
					</div>

					<button type="button" className={styles.navBtn} onClick={goNext} aria-label="Next project">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
							<path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
