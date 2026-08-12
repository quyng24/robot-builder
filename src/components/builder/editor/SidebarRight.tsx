import PropertiesPanel from './PropetiesPanel';
import RobotTree from './RobotTree';

export default function SidebarRight() {
    return (
        <aside className="w-72 border-l border-slate-800 bg-slate-900 flex flex-col">
            <RobotTree />
            <PropertiesPanel />
        </aside>
    );
}