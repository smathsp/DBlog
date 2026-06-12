export type FriendLink = {
	name: string;
	url: string;
	kind: 'github' | 'bilibili' | 'project';
	github?: string;
	bilibili?: string;
	type?: 'github' | 'bilibili';
	avatar?: string;
	description?: string;
	tags?: string[];
	status?: 'active' | 'inactive';
};

export const links: FriendLink[] = [
	// Add your friend links here
];
