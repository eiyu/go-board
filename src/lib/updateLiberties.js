// --------------------- Need to inspect more !!! -----------
const updatePartnersChainMember = (oppChain, nextState) => {
  if(oppChain.length === 0) {
    return nextState
  }
  const [f, ...r] = oppChain
  const updated = compose(
    set(lensToCapturing, true),
    // update self chain liberties from opponentschain
    (state => updateSelfChainLiberties(f,state))
  )(nextState)

  return updatePartnersChainMember(r,updated)
}
const updateLiberties = (coor, partners, currentState) => {
  // always get data from opponents head

  const self = currentState[coor[0]][coor[1]]
  const capturing = self.capturing
  const groupIsDead = (self.chain.filter(x => {
    return currentState[x[0]][x[1]].liberty > 0
  }).length === 0)
  if(self.liberty === 0 && !capturing && groupIsDead) {
    return set(lensToSuicide, true)(currentState)
  }
  if(partners.length === 0) {
    return currentState
  }
  const [first, ...rest] = partners
  const headChain = currentState[first.head[0]][first.head[1]].chain
  const headChainCoor = headChain.map(x => [{coor:x}])
  const chainIsDead = (headChain.filter(x => {
    return currentState[x[0]][x[1]].liberty > 0
  }).length === 0)
  const headChainNextState = (
    (st) => chainIsDead ? updatePartnersChainMember(headChainCoor,currentState) : currentState
  )(currentState)
  return updateLiberties(coor,rest, headChainNextState)
}
