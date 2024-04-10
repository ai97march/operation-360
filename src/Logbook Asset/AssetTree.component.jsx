import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AssetTree = (data, setSelectedNode) => {
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => handleNodeClick(nodes)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <div>
      <TreeView
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease-in-out",
        }}
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data, setSelectedNode)}
      </TreeView>
    </div>
  );
};

export default AssetTree;
