import { useEffect, useState } from "react";
import { useToast } from "~/contexts/ToastContext";
import { DataTable } from "~/components/common/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CrEditSubdepartmentModal } from "~/components/1-overview/14-subDepartments/CrEditSubDepartment";
import GuideBar from "~/components/common/GuideBar";
import PageHeader from "~/components/common/PageHeader";

export interface SubDepartment {
  description?: string | undefined;
  name?: string | undefined;
  color?: string | undefined;
}

const placeholderData: SubDepartment[] = [
  {
    description: "Afdeling for kræft",
    name: "Gul Stue",
    color: "#EBEB13",
  },
  {
    description: "Afdeling for fødsler",
    name: "Lilla stue",
    color: "#EB13C0",
  },
];

const columnDefs: ColumnDef<SubDepartment>[] = [
  {
    accessorKey: "name",
    header: "Navn",
    cell: ({ row }) => {
      const name = (row.getValue("name") as string) ?? "-";
      const color = (row.original.color as string) || "#ffffff"; // fallback to white

      return (
        <div
          className="px-2 py-1 border-2 w-[70%] border-black rounded"
          style={{ backgroundColor: color }}
        >
          <span className="text-black font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Beskrivelse",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "color",
    header: "Farvekode",
    cell: ({ row }) => row.getValue("color"),
  },
];

export default function WardsPage() {
  const [subDepartments, setSubDepartments] = useState<SubDepartment[]>(placeholderData);
  const [editSubDepartmentDTO, setEditSubDepartmentDTO] = useState<
    SubDepartment | undefined
  >(undefined);
  const { showToast } = useToast();
  const [isCrEditModalOpen, setIsCrEditModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);




  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        setEditSubDepartmentDTO(undefined);
        setIsCrEditModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAdd = async (subDepartment: SubDepartment) => {
    try {
      setSubDepartments((prev) => [...prev, subDepartment]);
    } catch (error) {
    }
  };

  const handleEdit = async (subDepartment: SubDepartment) => {
    try {
      setSubDepartments((prev) =>
        prev.map((sd) =>
          sd.name === subDepartment.name ? subDepartment : sd
        )
      );
    } catch (error) {

    }
  };

  const handleDelete = async (subDepartment: SubDepartment) => {
    try {
      setSubDepartments((prev) =>
        prev.filter((sd) => sd.name !== subDepartment.name)
      );
    } catch (error) {
      showToast("Fejl", "Der opstod en fejl under sletning af afsnit", "error");
    }
  };

  const handleSubmitSubDepartment = async (data: SubDepartment) => {
    if (!editSubDepartmentDTO) {
      handleAdd(data);
    } else {
      await handleEdit({ name: editSubDepartmentDTO.name, ...data });
    }
  };

  const handleCrEditModalClose = () => {
    setEditSubDepartmentDTO(undefined);
  };

  const handleEditClick = (subDepartment: SubDepartment) => {
    setEditSubDepartmentDTO(subDepartment);
    setIsCrEditModalOpen(true);
  };

  const handleAddClick = () => {
    setEditSubDepartmentDTO(undefined);
    setIsCrEditModalOpen(true);
  };

  return (
    <>
      <PageHeader title="Afsnit" />
      <div className="flex flex-col justify-between items-center overflow-hidden min-h-[calc(100vh-5rem)]">
        <DataTable
          data={subDepartments}
          columns={columnDefs}
          title=""
          onAdd={handleAddClick}
          onDelete={handleDelete}
          onEdit={handleEditClick}
          confirmText="Er du sikker på, at du vil slette dette afsnit?"
          confirmTitle="Bekræft sletning"
          isLoading={isLoading}
        />
        <CrEditSubdepartmentModal
          open={isCrEditModalOpen}
          onOpenChange={setIsCrEditModalOpen}
          onSubmitSubdepartment={handleSubmitSubDepartment}
          existingSubdepartment={editSubDepartmentDTO}
          onClose={handleCrEditModalClose}
        />
        <GuideBar />
      </div>
    </>
  );
}
