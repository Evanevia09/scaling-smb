type RelatedPostItem = {
	id: string;
	href: string;
	title: string;
	date: string;
	dateTime: string;
};

export function initRelatedPostsPager(): void {
	const root = document.querySelector<HTMLElement>('[data-related-posts]');
	if (!root) return;

	const list = root.querySelector<HTMLElement>('[data-related-list]');
	const pager = root.querySelector<HTMLElement>('[data-related-pager]');
	const prevBtn = root.querySelector<HTMLButtonElement>('[data-related-prev]');
	const nextBtn = root.querySelector<HTMLButtonElement>('[data-related-next]');
	const statusEl = root.querySelector<HTMLElement>('[data-related-status]');

	if (!list || !pager || !prevBtn || !nextBtn || !statusEl) return;

	let posts: RelatedPostItem[] = [];
	try {
		posts = JSON.parse(root.dataset.posts ?? '[]') as RelatedPostItem[];
	} catch {
		return;
	}

	const pageSize = Number(root.dataset.pageSize) || 2;
	const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
	let page = 1;

	const render = () => {
		const start = (page - 1) * pageSize;
		const slice = posts.slice(start, start + pageSize);

		list.replaceChildren(
			...slice.map((post) => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.className = 'blog-sidebar__post-link';
				a.href = post.href;

				const title = document.createElement('span');
				title.className = 'blog-sidebar__post-title';
				title.textContent = post.title;

				const time = document.createElement('time');
				time.className = 'blog-sidebar__post-date';
				time.dateTime = post.dateTime;
				time.textContent = post.date;

				a.append(title, time);
				li.append(a);
				return li;
			}),
		);

		statusEl.textContent = `${page} / ${totalPages}`;
		prevBtn.disabled = page <= 1;
		nextBtn.disabled = page >= totalPages;
	};

	prevBtn.addEventListener('click', () => {
		if (page > 1) {
			page -= 1;
			render();
		}
	});

	nextBtn.addEventListener('click', () => {
		if (page < totalPages) {
			page += 1;
			render();
		}
	});

	render();
}
