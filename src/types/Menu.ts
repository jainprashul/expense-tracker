export type MenuItem = {
  name: string | JSX.Element
  icon?: JSX.Element
  onClick?: () => void
  hide?: boolean
  separatorBelow?: boolean
  separatorAbove?: boolean
  children?: MenuItem[]
}