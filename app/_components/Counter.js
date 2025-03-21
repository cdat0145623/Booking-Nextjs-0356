"use client";
import { useState } from "react";

export default function Counter({ users }) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Have {users.length} users</p>
            <button onClick={() => setCount((c) => c + 1)}>{count}</button>
        </div>
    );
}
