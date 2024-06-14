import Card from '../Card'

export const PriceCard = () => {
  /**
   * TODO
   * - This request should be done on the server and cached
   * - UserConfig should contain a 'CoingeckoApiKey' field
   * - As well as price, it will be possible to show price history chart, market cap, daily price change etc
   */
  return (
    <Card icon="price">
      <p>SMH Price</p>
      <p className="text-2xl">2.50</p>
      <p className="text-xs font-light  text-muted-foreground">
        Source: Coingecko
      </p>
    </Card>
  )
}
