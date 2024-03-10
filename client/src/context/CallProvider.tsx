'use client'
import React, { useState } from 'react'
import CallContext from './CallContext'

function CallProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [callState, setCallState] = useState()
  return (
    <>
    {/* @ts-ignore */}
    <CallContext.Provider value={socket}>
      {children}
    </CallContext.Provider>
  </>
  )
}

export default CallProvider