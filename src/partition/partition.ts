import {SingularRelativeTimeUnit} from "../unit/singular-relative-time-unit";

export interface PartitionBase {
	value: string;
}

export interface UnitPartitionBase extends PartitionBase {
	unit: SingularRelativeTimeUnit;
}

export interface LiteralPartition extends PartitionBase {
	type: "literal";
}

export interface IntegerPartition extends PartitionBase {
	type: "integer";
}

export interface UnitIntegerPartition extends UnitPartitionBase {
	type: "integer";
}

export type Partition =
	|LiteralPartition
	|IntegerPartition;

export type UnitPartition =
	|LiteralPartition
	|UnitIntegerPartition;

export type Partitions = ReadonlyArray<Partition>;
export type UnitPartitions = ReadonlyArray<UnitPartition>;