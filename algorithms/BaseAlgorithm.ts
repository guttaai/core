
export interface AlgorithmResult
{
    passed: boolean;
    criticalCheckFailed: boolean;
    checks: {
        name: string;
        status: string;
        message?: string;
        isCritical?: boolean;
    }[];
}

export interface TokenMetadata
{
    mint: string;
    twitter: string | null;
    telegram: string | null;
    website: string | null;
    symbol: string;
    name: string;
    send?: boolean;
    algorithmResults?: {
        passed: boolean;
        criticalCheckFailed?: boolean;
        checks: {
            name: string;
            status: string;
            message?: string;
            isCritical?: boolean;
        }[];
    }[];
}

export abstract class BaseAlgorithm
{
    abstract name: string;
    abstract description: string;
    abstract execute(token: TokenMetadata): Promise<AlgorithmResult>;
} 