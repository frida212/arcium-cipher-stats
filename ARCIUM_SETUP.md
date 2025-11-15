# Arcium Dark Pool Integration Setup

This dashboard is configured to work with Arcium's encrypted computation network for privacy-preserving dark pool analytics.

## Overview

Arcium provides encrypted computation capabilities through Multi-Party Execution Environments (MXEs). This allows processing of sensitive trading data while only exposing aggregate statistics - preserving complete privacy for individual trades and user identities.

## Setup Instructions

### 1. Deploy Your Arcium MXE Program

First, you need to deploy an Arcium MXE program that handles your dark pool logic. Follow the [Arcium documentation](https://docs.arcium.com/developers/hello-world) to:

1. Install the Arcium CLI:
   ```bash
   npm install -g @arcium-hq/cli
   ```

2. Initialize your dark pool MXE project:
   ```bash
   arcium init my-dark-pool
   ```

3. Implement your encrypted dark pool logic in the MXE program
4. Deploy to Arcium testnet/mainnet
5. Note your MXE program address and cluster account

### 2. Configure Environment Variables

1. Copy `.env.example` to create a local `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Update the environment variables with your Arcium deployment details:
   ```env
   VITE_ARCIUM_PROGRAM_ID=your_mxe_program_address
   VITE_ARCIUM_CLUSTER_ACCOUNT=your_cluster_account
   VITE_SOLANA_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
   ```

### 3. Enable Arcium Integration

In `src/pages/Index.tsx`, change the `USE_ARCIUM` constant:

```typescript
const USE_ARCIUM = true; // Enable real Arcium integration
```

### 4. Customize Data Parsing

Update the `parseArciumStats` function in `src/services/arcium.ts` to match your MXE program's output format:

```typescript
function parseArciumStats(computationResult: any): MarketStats {
  return {
    total_volume: computationResult.yourVolumeField,
    trade_count: computationResult.yourTradeCountField,
    avg_price: computationResult.yourAvgPriceField,
    avg_latency_ms: computationResult.yourLatencyField,
  };
}
```

## Demo Mode

By default, the dashboard runs in demo mode with simulated data. This allows you to:
- Test the UI and functionality
- Develop without requiring an Arcium deployment
- Demonstrate the concept before implementing the full integration

To use demo mode, simply keep `USE_ARCIUM = false` in the code.

## Architecture

### Components

1. **Arcium Service** (`src/services/arcium.ts`)
   - Handles connection to Arcium network
   - Fetches aggregate statistics from MXE
   - Provides real-time subscription to updates
   - Falls back to mock data on connection failure

2. **Dashboard** (`src/pages/Index.tsx`)
   - Displays aggregate market statistics
   - Shows connection status (Arcium Live / Demo / Offline)
   - Updates metrics in real-time
   - Handles errors gracefully

3. **MetricCard** (`src/components/MetricCard.tsx`)
   - Reusable component for displaying individual metrics
   - Shows values with proper formatting
   - Displays trend indicators

### Data Flow

```
Arcium MXE → Solana Blockchain → Arcium Reader SDK → Dashboard
     ↓                                                    ↓
Private Orders                                    Public Aggregates
```

1. **Private Layer**: Individual orders are encrypted and processed in Arcium MXEs
2. **Aggregation**: MXE computes aggregate statistics (volume, count, averages)
3. **Public Layer**: Only safe aggregate metrics are written to Solana accounts
4. **Dashboard**: Reads and displays aggregate data in real-time

## Privacy Guarantees

✓ Individual order details never leave the Arcium secure enclave
✓ User identities are cryptographically protected
✓ Only safe aggregate metrics are publicly visible
✓ No trade information can be reverse-engineered from aggregates

## Resources

- [Arcium Documentation](https://docs.arcium.com/)
- [Arcium TypeScript SDK](https://ts.arcium.com/api)
- [Arcium Examples](https://github.com/arcium-hq/examples)
- [Arcium Discord](https://discord.com/invite/arcium)
- [Dark Pool Article](https://www.arcium.com/articles/redefining-defi-with-on-chain-dark-pools)

## Troubleshooting

### Connection Issues

If you see "Arcium Connection Failed":
1. Verify your MXE program address is correct in `.env`
2. Check that your Solana RPC endpoint is accessible
3. Ensure your MXE program is deployed and active
4. Check browser console for detailed error messages

### Data Not Updating

If statistics are stale:
1. Verify your MXE is processing trades
2. Check that aggregate accounts are being updated on-chain
3. Confirm subscription is active (check console logs)

### Demo Mode Stuck

If dashboard won't connect even with `USE_ARCIUM = true`:
1. Check environment variables are loaded correctly
2. Verify `.env` file exists and contains valid values
3. Restart the development server after changing `.env`

## Support

For Arcium-specific questions:
- [Arcium Discord](https://discord.com/invite/arcium)
- [Arcium Documentation](https://docs.arcium.com/)

For this dashboard implementation:
- Check the code comments in `src/services/arcium.ts`
- Review console logs for error details
- Test with demo mode first before integrating real Arcium
