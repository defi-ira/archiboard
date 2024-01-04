import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 600, y: 300 }, data: { label: '1' } },
    { id: '2', position: { x: 650, y: 400 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
const togglePanel = () => setIsPanelCollapsed(!isPanelCollapsed);
  

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onLoad = (rfi) => {
        if (!rfi) return;
        setReactFlowInstance(rfi);
    };

    useEffect(() => {
        if (reactFlowInstance) {
            reactFlowInstance.fitView();
        }
    }, [reactFlowInstance]);

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>

            <div className={`floating-panel ${isPanelCollapsed ? 'floating-panel-collapsed' : 'floating-panel-expanded'}`}>
                <div className="panel-collapse-button-container">
                    <button onClick={togglePanel} className="panel-collapse-button">
                    {isPanelCollapsed ? '»' : '«'} {/* Icons for Toggle */}
                    </button>
                </div>
                {/* Add components or content here */}
            </div>
            <div style={{ width: '100%', height: '100%' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onLoad={onLoad}
                    className='react-flow-canvas'
                >
                    <Controls />
                    <MiniMap />
                    <Background variant="dots" gap={48} size={1} />
                </ReactFlow>
            </div>

            <div className="floating-card">
                {/* Components for mobile view */}
            </div>
            <div className="switch">
                <input type="checkbox" id="darkModeToggle" onChange={toggleDarkMode} />
                <label htmlFor="darkModeToggle">Toggle Dark Mode</label>
            </div>
        </div>



    );

}