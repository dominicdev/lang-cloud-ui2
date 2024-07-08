"use client"
import ReactFlow, { 
  Controls, 
  Position, 
  MarkerType,
  Background,
  MiniMap, 
  useNodesState, 
  useEdgesState  } from 'reactflow';
import 'reactflow/dist/style.css';
import { useEffect } from "react";
import Link from "next/link";
import { GrProjects } from "react-icons/gr";
import { LuPencilLine } from "react-icons/lu";
import mermaid from 'mermaid';

const CustomNode = ({ data }) => {
  return (
    <div style={{
      background: data.color,
      border: '2px solid white',
      padding: 10,
      borderRadius: 5,
      width: 150,
      textAlign: 'center',
      color: 'white',
    }}>
      <strong>{data.label}</strong>
    </div>
  );
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: 'start', 
    type: 'custom',
    position: { x: 250, y: 0 },
    data: { label: 'Start', color: '#6ede87', fontColor: '#000' },
  },
  {
    id: 'agent', 
    position: { x: 250, y: 100 },
    data: { label: 'Agent', color: '#ff9a3c', fontColor: '#000' },
  },
  {
    id: 'action', 
    position: { x: 150, y: 200 },
    data: { label: 'Action', color: '#4ea5d9', fontColor: '#000' },
  },
  {
    id: 'end', 
    position: { x: 350, y: 200 },
    data: { label: 'End', color: '#ff6b6b', fontColor: '#fff' },
  },
];

const initialEdges = [
  { id: 'e-start-agent', source: 'start', target: 'agent',
    style: { stroke: 'white', strokeWidth: 1 }
    },
  { id: 'e-agent-action', source: 'agent', target: 'action',
    style: { stroke: 'white', strokeWidth: 1 }
    },
  { 
    id: 'e-action-agent', 
    source: 'action', 
    target: 'agent', 
    animated: true, 
    type: 'smoothstep',
    label: "continue",
    style: { stroke: '#f6ad55', strokeWidth: 2 },
  },
  { id: 'e-agent-end', source: 'agent', target: 'end',
    style: { stroke: 'white', strokeWidth: 2 } },
];

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={{...style, strokeWidth: 2}}
        className="react-flow__edge-path"
        d={edgePath}
      />
      {data?.animated && (
        <circle r="4" fill={'white'}>
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    </>
  );
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function Home() {

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);

  // const initialEdges = [
  //   { id: '1-2', source: '1', target: '2' },
  //   { id: '2-3', source: '2', target: '3', label: 'continue', markerEnd: { type: MarkerType.ArrowClosed },},
  //   { id: '3-2', source: '3', target: '2', markerEnd: { type: MarkerType.ArrowClosed },},
  //   { id: '2-4', source: '2', target: '4', label: 'end' , markerEnd: { type: MarkerType.ArrowClosed }, animated: true }
  
  // ];

  // const initialNodes = [
  //   {
  //     id: '1', 
  //     type: 'custom',
  //     data: { label: '___START___' },
  //     position: { x: 280, y: 20 },
  //     type: 'input',
  //   },
  //   {
  //     id: '2', 
  //     data: { label: 'agent' },
  //     position: { x: 280, y: 140 },
      

  //   },
  //   {
  //     id: '3',
  //     data: { label: 'action' },
  //     position: { x: 110, y: 280 },
  //     type: 'bidirectional',
  //     sourcePosition: Position.Left,
  //     targetPosition: Position.Right,
  //   },
  //   {
  //     id: '4',
  //     data: { label: '__end__' },
  //     position: { x: 440, y: 280 },
  //     type: 'bidirectional',
  //     sourcePosition: Position.Right,
  //     targetPosition: Position.Left,
  //   },
  // ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (

    <div className="flex h-full min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}

      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r-2 border-blue-500/50">
        {/* Logo */}
        <div className="mb-8">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            {/* Add your logo SVG path here */}
          </svg>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-4">
          {/* Add icons for each nav item */}
          <Link href="#" className="p-2 hover:bg-gray-700 rounded-lg">
            <GrProjects className="w-6 h-6" />
          </Link>
          <Link href="#" className="p-2 hover:bg-gray-700 rounded-lg">
            <LuPencilLine className="w-6 h-6" />
          </Link>

          {/* Repeat for other nav items */}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8 px-0 h-full">
        <div className="flex w-full border-b-2 border-blue-500/50 mb-4 px-8 ">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-4">
            Personal &gt; Deployments
          </div>

        </div>
        <div className="">
          <div className="w-full h-full ">
            <div className="w-1/2 h-[560px] border-r-2 border-blue-500/50 ">
              <div style={{ height: '80%' }}>
                <ReactFlow 
                nodes={nodes}
                edges={edges}
                defaultEdgeOptions={defaultEdgeOptions} 
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes} 
                onlyRenderVisibleNodes={false}
                > 
                </ReactFlow>
              </div>
              <div className=' w-full rounded px-8  '> 
                <div className='w-ful p-5 bg-blue-950/40'>
                <label className='font-bold'>Input</label>
                <div className='text-'>
                  <label>Message</label>
                  <input className='border w-full text-white bg-transparent p-3' placeholder='Enter Message' />
                  </div>
                </div>
              </div>


            </div>
            <div className="w-1/2  ">

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
