import type { GraphRow, Head, Remote, Tag } from '@gitkraken/gitkraken-components';

export type GitGraphRowHead = Head;
export type GitGraphRowRemoteHead = Remote;
export type GitGraphRowTag = Tag;
export const enum GitGraphRowType {
	Commit = 'commit-node',
	MergeCommit = 'merge-node',
	Stash = 'stash-node',
	Working = 'work-dir-changes',
	Conflict = 'merge-conflict-node',
	Rebase = 'unsupported-rebase-warning-node',
}

export interface GitGraphRow extends GraphRow {
	type: GitGraphRowType;
	heads?: GitGraphRowHead[];
	remotes?: GitGraphRowRemoteHead[];
	tags?: GitGraphRowTag[];
}

export interface GitGraph {
	readonly repoPath: string;
	/** A map of all avatar urls */
	readonly avatars: Map<string, string>;
	/** A set of all "seen" commit ids */
	readonly ids: Set<string>;
	/** The rows for the set of commits requested */
	readonly rows: GitGraphRow[];
	readonly sha?: string;

	readonly paging?: {
		readonly limit: number | undefined;
		readonly startingCursor: string | undefined;
		// readonly endingCursor: string | undefined;
		readonly more: boolean;
	};

	more?(limit: number | { until?: string } | undefined): Promise<GitGraph | undefined>;
}
