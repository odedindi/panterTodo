import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default useIsomorphicLayoutEffect;
