import { useRouter } from "next/navigation";
import type { NextRouter } from "next/router";
import { useRef, useState } from "react";

export default function usePush(): NextRouter["push"] {
	const router = useRouter();
	const routerRef = useRef(router);

	routerRef.current = router;

	const [{ push }] = useState<Pick<NextRouter, "push">>({
		push: async (path) => routerRef.current.push(path as string)!,
	});
	return push;
}
