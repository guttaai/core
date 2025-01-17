import { EventEmitter } from 'eventemitter3';
import { BaseAlgorithm, TokenMetadata, AlgorithmResult } from '../algorithms/BaseAlgorithm';
import { BaseOperator } from '../operators/BaseOperator';

export interface AgentConfig
{
    name: string;
    description: string;
    algorithms: BaseAlgorithm[];
    operators: BaseOperator[];
}

export abstract class BaseAgent extends EventEmitter
{
    protected readonly name: string;
    protected readonly description: string;
    protected readonly algorithms: BaseAlgorithm[];
    protected readonly operators: BaseOperator[];
    protected isRunning: boolean = false;

    protected constructor(config: AgentConfig)
    {
        super();
        this.name = config.name;
        this.description = config.description;
        this.algorithms = config.algorithms;
        this.operators = config.operators;
    }

    abstract process(data: TokenMetadata): Promise<AlgorithmResult[]>;

    async start(): Promise<void>
    {
        if (this.isRunning)
        {
            return;
        }

        this.isRunning = true;

        // Start all operators
        await Promise.all(this.operators.map(operator => operator.start()));
    }

    async stop(): Promise<void>
    {
        if (!this.isRunning)
        {
            return;
        }

        this.isRunning = false;

        // Stop all operators
        await Promise.all(this.operators.map(operator => operator.stop()));
    }

    getName(): string
    {
        return this.name;
    }

    getDescription(): string
    {
        return this.description;
    }
} 