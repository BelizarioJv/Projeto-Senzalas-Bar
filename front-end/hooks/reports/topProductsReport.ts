import { useQuery } from "@tanstack/react-query";
import { reportService } from "@/services/report.service";
import { filtersReportRequest } from "@/types/report";

export const useGetTopProductsReport = (filters: filtersReportRequest) => {
  return useQuery({
    queryKey: ["monthlyTopProductsReport", filters],
    queryFn: () => reportService.getTopSellingProductsReport(filters),
  });
};
